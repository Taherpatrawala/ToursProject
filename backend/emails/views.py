from django.shortcuts import render
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status
from rest_framework.response import Response


# Create your views here.

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def send_email(request):
    # try:
    subject, from_email, to = '4th Email from Django :)', "taherpatrawala9@gmail.com", 'taherbhai7848@gmail.com'
    text_content = "This is neat huh ;)"

    html_content = render_to_string(
        './email_template.html', {'username': 'Taher', 'app_url': 'http://localhost:5173'})
    email = EmailMultiAlternatives(subject, text_content,
                                   from_email, [to])
    email.attach_alternative(html_content, 'text/html')
    email.send()
    return Response('Email sent ig', status=status.HTTP_200_OK)
    # except:
    #    return Response('There was some error while sending the mail, please try again',
    #                    status=status.HTTP_400_BAD_REQUEST)
