import os
from .settings import *
from .settings import BASE_DIR


ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'backend',
                 'voyager', 'localhost:8000', os.environ['WEBSITE_HOSTNAME']]
CSRF_TRUSTED_ORIGINS = ['http://localhost:5173',
                        'http://127.0.0.1:5173', 'https://'+os.environ['WEBSITE_HOSTNAME']]

DEBUG = False
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

]

CORS_ALLOWED_ORIGINS = [
    'https://voyager8.netlify.app/'
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

CONNECTION = os.environ['AZURE_POSTGRESQL_CONNECTION']
CONNECTION_STR = {pairs.split('=')[0]: pairs.split(
    '=')[1] for pairs in CONNECTION.split(' ')}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': CONNECTION_STR['dbname'],
        'USER': CONNECTION_STR['user'],
        'PASSWORD': CONNECTION_STR['password'],
        'HOST': CONNECTION_STR['host'],
    }
}
