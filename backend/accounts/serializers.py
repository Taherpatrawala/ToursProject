from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import WishList

User = get_user_model()


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'profileImage']


class WishListDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishList
        fields = '__all__'
        read_only_fields = ('user',)
