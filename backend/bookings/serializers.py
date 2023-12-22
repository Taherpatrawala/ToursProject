from rest_framework import serializers
from .models import Booking


class BookingsSerializers(serializers.ModelSerializer):
    model = Booking
    fields = '__all__'

    class Meta:
        unique_together = ('user', 'event_title')
