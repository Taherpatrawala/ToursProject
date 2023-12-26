from scraper.views import ScrapedDataView, ScrapedDataView2, ScrapeIndividualEventData, GetAutoCompleteList
from django.urls import path

urlpatterns = [
    path('', ScrapedDataView.as_view(), name='scraped_data'),
    path('2/', ScrapedDataView2.as_view(), name='scraped_data2'),
    path('event/', ScrapeIndividualEventData.as_view(),
         name='scrape_individual_data'),
    path('getAutocompleteData/', GetAutoCompleteList.as_view(),
         name='getAutocompleteData'),
]
