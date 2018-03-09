from .views import tictactoe
from django.urls import path


urlpatterns = [
    path('', tictactoe.as_view(), name = 'index'),
]