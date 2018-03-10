from .views import Simon
from django.urls import path


urlpatterns = [
    path('', Simon.as_view(), name = 'simon'),
]