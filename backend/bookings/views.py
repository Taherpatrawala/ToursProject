from django.shortcuts import render, redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status
from .serializers import BookingsSerializers
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Booking
import stripe
from decouple import config


# Create your views here.


class MakeBooking(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        mutable_data = request.data.copy()
        mutable_data['user'] = [request.user.id]
        event_title = mutable_data['event_title']
        existingBookings = Booking.objects.filter(
            user=request.user.id).filter(event_title=event_title)
        print(existingBookings)
        if existingBookings:
            return Response("Booking Already Made", status=status.HTTP_400_BAD_REQUEST)
        event_price = mutable_data['event_price'].replace(
            '₹', '').replace(',', '').replace('*', '').strip()
        number_of_adults = mutable_data['number_of_adults']
        serializer_instance = BookingsSerializers(data=mutable_data)
        if serializer_instance.is_valid():
            print(serializer_instance.validated_data)
            try:
                stripe.api_key = config('STRIPE_SECRET_KEY')
                checkout_session = stripe.checkout.Session.create(
                    line_items=[{
                        'price_data': {
                            'currency': 'inr',
                            'product_data': {
                                'name': event_title,
                            },
                            'unit_amount': int(event_price)*100*int(number_of_adults),
                        },
                        'quantity': 1
                    }],
                    mode='payment',
                    success_url='http://localhost:5173/bookings/',
                    cancel_url='http://localhost:5173/places/',
                )
                serializer_instance.save()
                return Response({'sessionId': checkout_session.id}, status=status.HTTP_202_ACCEPTED)
            except Exception as e:
                print(e)
                return Response('Error hogaya ')

        else:
            return Response(serializer_instance.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_booking_details(request):
    user = request.user.id
    user_booking_instance = Booking.objects.filter(user=user)
    user_booking_data = BookingsSerializers(user_booking_instance, many=True)

    return Response(user_booking_data.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def cancel_booking(request):
    user = request.user.id
    user_booking_instance = Booking.objects.filter(
        user=user, event_title=request.data['event_title'])
    user_booking_instance.delete()
    return Response(f'Your booking has been cancelled..', status=status.HTTP_204_NO_CONTENT)
