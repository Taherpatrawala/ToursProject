from django.urls import path
from .views import make_booking
urlpatterns = [
    path('', make_booking, name='make_booking')
]
