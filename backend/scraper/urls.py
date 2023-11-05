from scraper.views import ScrapedDataView
from django.urls import path

urlpatterns = [
    path('', ScrapedDataView.as_view(), name='scraped_data')
]
