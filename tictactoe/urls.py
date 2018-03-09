from .views import TicTacToe
from django.urls import path


urlpatterns = [
    path('', TicTacToe.as_view(), name = 'tictactoe'),
]