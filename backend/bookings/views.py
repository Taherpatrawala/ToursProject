from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status
from .serializers import BookingsSerializers
from rest_framework.response import Response

# Create your views here.


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def make_booking(request):
    serializer_instance = BookingsSerializers(data=request.data)
    if serializer_instance.is_valid():
        print(serializer_instance.data)
        serializer_instance.save()
        return Response(f"Booking for {request.data['event_title']} has been made succesfully :)", status=status.HTTP_201_CREATED)
    else:
        return Response(serializer_instance.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
