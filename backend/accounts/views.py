from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework import permissions


User = get_user_model()
# Create your views here.


class SignUpView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data
        name = data['name']
        email = data['email']
        password = data['password']
        password2 = data['password2']

        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({'message': 'Email already exists'})
            else:
                if len(password) < 6:
                    return Response({'message': 'Password must be atleast 6 characters long!'})
                else:
                    user = User.objects.create_user(
                        email=email, password=password, name=name)
                    user.save()
                    return Response({'message': 'User created succesfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Passwords do not match'})
