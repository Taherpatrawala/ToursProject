from django.contrib import admin
from .models import WishList, UserAccount
# Register your models here.
admin.site.register([WishList, UserAccount])
