from django.shortcuts import render
from bs4 import BeautifulSoup
import requests
from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from rest_framework import status, permissions
from lxml import etree

# Create your views here.


class ScrapedDataView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        placeName = request.data['placeName']
        url = f"https://www.holidify.com/places/{placeName}/"
        response = requests.get(url)

        if response.status_code == 200:
            html_content = response.text
            soup = BeautifulSoup(html_content, 'html.parser')
            # print(soup.prettify())
            imagesData = soup.find_all('div', 'lazyBG', limit=6)
            # print(imagesData)
            imagesLinks = list(
                map(lambda div: div['data-original'], imagesData))
            # print(imagesLinks)
            descriptionData = soup.find('div', 'readMoreText')
            data = {
                'images': imagesLinks,
                'description': str(descriptionData)
            }
            return JsonResponse(data, status=status.HTTP_200_OK, safe=False)
        else:
            return HttpResponse({'msg': 'error'}, status=status.HTTP_400_BAD_REQUEST)


class ScrapedDataView2(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        placeName = request.data['placeName']
        url = f"https://www.thrillophilia.com/listings/search?destination_slug=&search={placeName}"
        response = requests.get(url)
        # print(response.text)

        if response.status_code == 200:
            html_content = response.text
            soup = BeautifulSoup(html_content, 'html.parser')
            dom = etree.HTML(str(soup))
            # description1 = dom.xpath(
            #    "/html/body/div/div/main/section[1]/div/div/div/div/div/p")[0].text
            # print(description1)
            locationName = soup.find(
                'div', 'intro-top-content').find('h1', 'title').text
            backgroundImage = soup.find(
                'picture', 'bg-image').find('img')['srcset']
            description = str(soup.find('section', 'destination-description'))
            sections = soup.find_all('section', 'tour-section')

            def cardDataHandler(card):

                cardImage = card.find('img', 'lazy-image')['data-src']
                cardTitle = card.find('a', 'title').text
                cardPrice = card.find('span', 'current-price').text
                cardRedirectUrl = card['data-href']
                cardDetails = {
                    'image': cardImage,
                    'title': cardTitle,
                    'price': cardPrice,
                    'redirectUrl': cardRedirectUrl
                }
                return cardDetails

            def handleSectionData(section):
                sectionHeading = section.find('span', 'section-heading').text
                sectionCards = section.find_all('div', 'tour-card')
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
            data = {'locationName': locationName, 'backgroundImage': backgroundImage,
                    'description': description, 'sections': sectionDataList}

            return JsonResponse(data, status=status.HTTP_200_OK, safe=False)
        else:
            return HttpResponse({'msg': 'error'}, status=status.HTTP_400_BAD_REQUEST)


class ScrapeIndividualEventData(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        redirectUrl = request.data['redirectUrl']
        response = requests.get(
            f"https://www.thrillophilia.com{redirectUrl}")

        if response.status_code == 200:
            html_content = response.text
            soup = BeautifulSoup(html_content, 'html.parser')
            imagesLinks = soup.find_all('img', 'banner__image')
            imageLinksList = list(
                map(lambda image: image['src'], imagesLinks))
            overview = str(soup.find('div', 'product-overview__details'))
            data = {
                'images': imageLinksList,
                'overview': overview,
            }
            return JsonResponse(data, status=status.HTTP_200_OK, safe=False)
        else:
            return HttpResponse({'msg': 'error'}, status=status.HTTP_400_BAD_REQUEST)
