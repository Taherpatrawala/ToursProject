# Generated by Django 3.2.16 on 2023-12-09 08:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='WishList',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('event_title', models.CharField(max_length=255, unique=True)),
                ('event_image', models.CharField(max_length=255)),
                ('event_price', models.CharField(max_length=255)),
                ('event_redirecturl', models.URLField()),
                ('user', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'event_title')},
            },
        ),
    ]
