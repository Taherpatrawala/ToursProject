from django.shortcuts import render
from bs4 import BeautifulSoup
import requests
from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from rest_framework import status, permissions
from lxml import etree
from urllib.parse import urlparse
import re

# Create your views here.


class ScrapedDataView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        placeLink = request.data['placeLink']
        url = placeLink
        parsed_url = urlparse(url)
        path_segments = parsed_url.path.split('/')
        place_name = path_segments[-2]
        response = requests.get(url)
        packages_resonse = requests.get(f"{url}packages.html")

        if response.status_code == 200:
            html_content = response.text
            soup = BeautifulSoup(html_content, 'html.parser')
            # print(soup.prettify())
            imagesData = soup.find_all('div', 'lazyBG', limit=6)
            # print(imagesData)

            imagesLinks = list(
                map(lambda div: div['data-original'], imagesData))
            card_data = None
            # print(imagesLinks)
            descriptionData = soup.find('div', 'readMoreText')
            if packages_resonse.status_code == 200:
                html_content2 = packages_resonse.text
                soup2 = BeautifulSoup(html_content2, 'html.parser')
                cards = soup2.find_all('div', 'inventory-card')

                def remove_special_characters(input_string):
                    # Define a regular expression pattern to match non-alphanumeric characters
                    pattern = re.compile(r'[^a-zA-Z0-9\s]')

                    # Use the pattern to replace special characters with an empty string
                    result_string = re.sub(pattern, '', input_string)

                    return result_string

                def cardDataHandler(card):

                    cardImage = card.find('img', 'lazy')['data-original']
                    cardTitle = card.find(
                        'div', 'inventory-details').find('h3', 'name').text
                    cardTripDuration = card.find('p', 'trip-duration').text
                    cardInclusionItems = str(
                        card.find_all('div', 'inclusion-item'))
                    cardPrice = card.find(
                        'p', 'price').text
                    cardDescPrice = card.find(
                        'p', 'price-desc').text
                    cardId = card['dataid']
                    cardurlTitle = remove_special_characters(cardTitle)
                    cardurl = f"/{cardurlTitle.lstrip().replace(' ','-').lower()}{cardId}/{place_name}"
                    cardRedirectUrl = cardurl
                    cardDetails = {
                        'image': cardImage,
                        'title': cardTitle,
                        'inclusions': cardInclusionItems,
                        'tripDuration': cardTripDuration,
                        'price': cardPrice,
                        'priceDesc': cardDescPrice,
                        'redirectUrl': cardRedirectUrl
                    }
                    return cardDetails

                card_data = list(
                    map(lambda card: cardDataHandler(card), cards))
            data = {
                'images': imagesLinks,
                'description': str(descriptionData),
                'cards': card_data
            }
            return JsonResponse(data, status=status.HTTP_200_OK, safe=False)
        else:
            return HttpResponse({'msg': 'error'}, status=status.HTTP_400_BAD_REQUEST)


class ScrapedDataView2(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        placeName = request.data['placeName']
        url = f"https://www.thrillophilia.com/listings/search?search={placeName}"
        response = requests.get(url)
        # print(response.text)

        if response.status_code == 200:
            html_content = response.text
            print(html_content)
            soup = BeautifulSoup(html_content, 'html.parser')
            dom = etree.HTML(str(soup))
            # description1 = dom.xpath(
            #    "/html/body/div/div/main/section[1]/div/div/div/div/div/p")[0].text
            # print(description1)
            # locationName = soup.find(
            #    'div', 'intro-top-content').find('h1', 'title').text
            # backgroundImage = soup.find(
            #    'picture', 'bg-image').find('img')['srcset']
            # description = str(soup.find('section', 'destination-description'))

            sections = soup.find_all('div', 'container')

            def cardDataHandler(card):

                cardImage = card.find('img', 'gm-observing')['src']
                cardTitle = card.find(
                    'h3', 'productCard_name__G3d6e')
                cardPrice = card.find(
                    'div', 'productCard_actualPrice__L96rh').text
                cardRedirectUrl = card['href']
                cardDetails = {
                    'image': cardImage,
                    'title': cardTitle,
                    'price': cardPrice,
                    'redirectUrl': cardRedirectUrl
                }
                return cardDetails

            def handleSectionData(section):
                sectionHeading = section.find(
                    'h1', 'ListingPageHeader_mainHeading__nFqKH')
                sectionCards = section.find_all(
                    'a', 'productCard_container__aeQWM')
                cardsList = list(
                    (map(lambda card: cardDataHandler(card), sectionCards)))
                sectionData = {
                    'heading': sectionHeading,
                    'cards': cardsList
                }
                return sectionData

            sectionDataList = list(
                map(lambda section: handleSectionData(section), sections))

            # print(cardsList)
            # data = {'locationName': locationName, 'backgroundImage': backgroundImage,
            #        'description': description, 'sections': sectionDataList}

            return JsonResponse(sectionDataList, status=status.HTTP_200_OK, safe=False)
        else:
            return HttpResponse({'msg': 'error'}, status=status.HTTP_400_BAD_REQUEST)


class ScrapeIndividualEventData(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        redirectUrl = request.data['redirectUrl']
        response = requests.get(
            f"https://www.holidify.com/package/{redirectUrl}")

        if response.status_code == 200:
            html_content = response.text
            soup = BeautifulSoup(html_content, 'html.parser')
            packageDetails = soup.find('div', 'package-objective-details')
            tripDuration = packageDetails.find('p', 'trip-duration').text
            title = str(packageDetails.find('h1').text)
            imagesLinks = soup.find_all(
                'div', 'atf-image-holder')
            imageLinksList = list(
                map(lambda image: image['data-original'], imagesLinks))
            print(imagesLinks)
            overview = str(soup.find('div', 'inclusion-exclusion'))
            cost = str(soup.find('div', 'price').text)
            data = {
                'title': title,
                'trip_duration': tripDuration,
                'images': imageLinksList,
                'overview': overview,
                'cost': cost
            }
            return JsonResponse(data, status=status.HTTP_200_OK, safe=False)
        else:
            return HttpResponse({'msg': 'error'}, status=status.HTTP_400_BAD_REQUEST)


class GetAutoCompleteList(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        placeName = request.data['placeName']
        response = requests.get(
            f"https://www.holidify.com/rest/search/getSearchResultsMain.hdfy?placeID=ZURICH&query={placeName}")
        if response.status_code == 200:
            return HttpResponse(response, status=status.HTTP_200_OK)
        else:
            return HttpResponse({'msg': 'error'}, status=status.HTTP_400_BAD_REQUEST)
