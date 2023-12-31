from django.db import models
from django.core.files.base import ContentFile
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountsManager(BaseUserManager):
    def create_user(self, email, name, profileImage, password=None):
        if not email:
            raise ValueError('User must have a email address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        user.set_password(password)
        if profileImage:
            user.profileImage.save(
                profileImage.name, ContentFile(profileImage.read()))
        user.save()

        return user

    def create_superuser(self, email, name, password):
        user = self.create_user(email, name, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    profileImage = models.ImageField(
        null=True, blank=True, upload_to='profilepic/')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountsManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.email


class WishList(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    event_title = models.CharField(max_length=255)
    event_image = models.CharField(max_length=500)
    event_price = models.CharField(max_length=255)
    event_redirecturl = models.CharField(max_length=300)

    def deleteWishlistItem(self):
        return self.delete()

    class Meta:
        unique_together = ('user', 'event_title',)


class Reviews(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    event_title = models.CharField(max_length=255)
    review = models.CharField(max_length=300)
    review_date = models.DateField(auto_now=True)
    review_images = models.ImageField(
        null=True, blank=True, upload_to='review_images/')

    class Meta:
        order_with_respect_to = 'user'
        models.UniqueConstraint(
            fields=['user', 'event_title'], name='unique_review')
