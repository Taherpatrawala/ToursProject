from django.db import models
from django.contrib.auth import get_user_model
from accounts.models import UserAccount

# Create your models here.


class Booking(models.Model):
    user = models.ManyToManyField(UserAccount)
    event_title = models.CharField(max_length=255)
    event_redirecturl = models.CharField(max_length=300)
    event_price = models.CharField(max_length=255)
    event_image = models.CharField(max_length=500)
    number_of_adults = models.PositiveIntegerField()
    date_of_booking = models.DateTimeField(auto_now=True)
    check_in_date = models.DateField(auto_now=False)

    def __str__(self):
        return f"{self.user} booked for {self.event_title} for {self.check_in_date}"
