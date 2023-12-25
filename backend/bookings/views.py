from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status
from .serializers import BookingsSerializers
from rest_framework.response import Response
from .models import Booking

# Create your views here.


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def make_booking(request):
    mutable_data = request.data.copy()
    mutable_data['user'] = request.user.id
    serializer_instance = BookingsSerializers(data=mutable_data)
    if serializer_instance.is_valid():
        print(serializer_instance.validated_data)
        serializer_instance.save()
        return Response(f"Booking for {request.data['event_title']} has been made succesfully :)", status=status.HTTP_201_CREATED)
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
