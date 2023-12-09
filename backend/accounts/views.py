from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework import permissions
from .serializers import UserInfoSerializer, WishListDataSerializer
from .models import WishList

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


class GetUserDataView(generics.RetrieveAPIView):

    serializer_class = UserInfoSerializer

    def retrieve(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddToWishList(generics.CreateAPIView):
    queryset = WishList.objects.all()
    serializer_class = WishListDataSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def post(self, request, *args, **kwargs):
        self.create(request, *args, **kwargs)
        return Response(self.request.data['event_title'], status=status.HTTP_201_CREATED)


class GetWishlistData(APIView):
    serializer_class = WishListDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = self.request.user

        Wishlists = WishList.objects.filter(user=user)
        userWishlist = []
        for wishlist in Wishlists:
            userWishlist.append(wishlist.event)

        print(userWishlist)
        return Response(userWishlist, status=status.HTTP_202_ACCEPTED)
