from scraper.views import ScrapedDataView, ScrapedDataView2
from django.urls import path

urlpatterns = [
    path('', ScrapedDataView.as_view(), name='scraped_data'),
    path('2/', ScrapedDataView2.as_view(), name='scraped_data2'),
]
