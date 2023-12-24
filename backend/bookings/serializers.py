from rest_framework import serializers
from .models import Booking


class BookingsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        unique_together = ('user', 'event_title')
