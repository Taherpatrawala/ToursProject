from django.contrib import admin
from django.urls import path, include
from accounts.views import SignUpView, GetUserDataView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('getUserData/', GetUserDataView.as_view(), name='userData'),


]
