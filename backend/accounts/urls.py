from django.contrib import admin
from django.urls import path, include
from accounts.views import SignUpView, GetUserDataView, AddToWishList

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('getUserData/', GetUserDataView.as_view(), name='userData'),
    path('addToWishlist/', AddToWishList.as_view(), name='wishlist'),


]
