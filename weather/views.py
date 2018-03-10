from django.shortcuts import render
from django.views.generic import View
# Create your views here.


class Weather(View):

    def get(self, request, *args, **kwargs):
        return render(request, template_name='weather/weather.html')