from django.shortcuts import render
from django.core.mail import send_mail
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status
from rest_framework.response import Response


# Create your views here.

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def send_email(request):
    try:
        send_mail('Second Email from Django :)', "This is neat huh ;)",
                  None, ['taherbhai7848@gmail.com'], fail_silently=False)
        return Response('Email sent ig', status=status.HTTP_200_OK)
    except:
        Response('There was some error while sending the mail, please try again',
                 status=status.HTTP_400_BAD_REQUEST)
