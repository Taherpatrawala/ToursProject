from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from rest_framework import permissions
from .serializers import UserInfoSerializer, WishListDataSerializer, ReviewSerializer
from .models import WishList, Reviews


User = get_user_model()
# Create your views here.


class SignUpView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data
        name = data['name']
        email = data['email']
        password = data['password']
        password2 = data['password2']
        profileImage = data.get('profileImage')

        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({'message': 'Email already exists'})
            else:
                if len(password) < 6:
                    return Response({'message': 'Password must be atleast 6 characters long!'})
                else:
                    user = User.objects.create_user(
                        email=email, password=password, name=name, profileImage=profileImage)
                    user.save()
                    return Response({'message': 'User created succesfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Passwords do not match'})


class GetUserDataView(generics.RetrieveAPIView):

    serializer_class = UserInfoSerializer

    def retrieve(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddToWishList(generics.CreateAPIView):
    queryset = WishList.objects.all()
    serializer_class = WishListDataSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def post(self, request, *args, **kwargs):
        wishlist = WishList.objects.filter(
            user=self.request.user, event_title=self.request.data['event_title'])
        if wishlist.exists():
            return Response(f"{self.request.data['event_title']} is already in your wishlist", status=status.HTTP_400_BAD_REQUEST)
        self.create(request, *args, **kwargs)
        return Response(f"{self.request.data['event_title']} is now in your wishlist", status=status.HTTP_201_CREATED)


class GetWishlistData(APIView):
    serializer_class = WishListDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = self.request.user

        Wishlists = WishList.objects.filter(user=user).values()
        print(f"{Wishlists}")
        userWishlist = []
        for wishlist in Wishlists:  # you didnt need to do this since .values() returns a dict already
            print(f"{wishlist}")
            for event_title, event_image, event_price, event_redirecturl in wishlist:
                print(event_title)
            userWishlist.append({event_title: wishlist.event_title, event_image: wishlist.event_image,
                                event_price: wishlist.event_price, event_redirecturl: wishlist.event_redirecturl})

        print(userWishlist)
        return Response(userWishlist, status=status.HTTP_202_ACCEPTED)

# same thing as above but with function based view


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def getAllWishlist(request):
    user = request.user
    print(user.name)
    wishlists = WishList.objects.filter(user=user).values()
    print(wishlists)
    # for wishlist in wishlists:
    # print({'user: ': wishlist.user_id, 'title: ': wishlist.event_title})
    # context = {"wishlists": wishlists}
    # return render(request, 'wishlist/index.html', context)
    return Response(wishlists, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def deleteWishlist(request):
    user = request.user
    id = request.data.get('id')
    try:
        wishlist_item = WishList.objects.get(user=user, id=id)
        # wishlist_item.delete() #you could have just done this but juts wanted to learn about model methods
        wishlist_item.deleteWishlistItem()
        return Response('Item Deleted from your wishlist', status=status.HTTP_202_ACCEPTED)
    except:
        return Response('Error occured while deleting the item ', status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
@login_required
def add_review(request):
    user = request.user
    review = request.data.get('review')
    event_title = request.data.get('event_title')
    review_image = request.data.get('review_image')
    review_in_db = Reviews(user=user, event_title=event_title,
                           review=review, review_images=review_image)
    review_in_db.save()
    return Response('Review added succesfully', status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_all_reviews(request):
    user = request.user
    event_title = request.GET.get('event_title')
    try:
        review_instance = Reviews.objects.filter(
            event_title=event_title).values()
        # print(review_instance)
        new_review_instance = []
        for review in review_instance:
            print(review)
            user_data = User.objects.filter(
                id=review['user_id']).values()

            def getUserData(user):
                name = user['name']
                profilepic = user['profileImage']
                return {"name": name, "profileImage": profilepic}
            user_data = list(map(lambda user: getUserData(user), user_data))
            print(user_data[0])
            review.update(user_data[0])
            print(review)
            new_review_instance.append(review)
        review_serialzer = ReviewSerializer(review_instance)
        # print('serializer->', review_serialzer.data)
        return Response(new_review_instance, status=status.HTTP_200_OK)
    except:
        return Response("No Reviews Yet", status=status.HTTP_404_NOT_FOUND)
