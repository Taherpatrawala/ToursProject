import pytest
import requests

BASE_URL = 'http://localhost:8000/api/'


def test_get_all_reviews():
    response = requests.get(
        f"{BASE_URL}accounts/getAllReviews/", {'event_title': 'Fun in Mumbai'})

    assert response.status_code == 200
    assert response.headers['content-type'] == 'application/json'
    data = response.json()
    print(data)
    assert type(data[0]['id']) and type(data[0]['user_id']) is int
    assert type(data[0]['event_title']) is str
