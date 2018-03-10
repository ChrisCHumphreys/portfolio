from .views import Weather
from django.urls import path


urlpatterns = [
    path('', Weather.as_view(), name = 'weather'),
]