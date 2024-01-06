from django.urls import path
from .views import MakeBooking, get_booking_details, cancel_booking
urlpatterns = [
    path('', MakeBooking.as_view(), name='make_booking'),
    path('getBookingData/', get_booking_details, name='get_booking_details'),
    path('cancelBooking/', cancel_booking, name='cancel_booking')
]
