$(document).ready(function() {
  // global variables
  var KEY = "7d7a647dc4249f99da503b30c81d211a";
  var userLocation = {};
  var weatherCall = "";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude);
      userLocation.lat = position.coords.latitude;
      userLocation.lon = position.coords.longitude;
      weatherCall += "http://api.openweathermap.org/data/2.5/weather?lat="
      weatherCall += JSON.stringify(userLocation.lat);
      weatherCall += "&lon=";
      weatherCall += JSON.stringify(userLocation.lon);
      weatherCall += "&APPID=";
      weatherCall += KEY;
      weatherCall += "&units=metric";

      $.getJSON(weatherCall, function(weather) {
        // make city name a string and output to #city
        var city = JSON.stringify(weather.name);
        city = city.slice(1, (city.length - 1));
        var cityHtml = "";
        cityHtml += "<h3>";
        cityHtml += city;
        cityHtml += "</h3>";
        $("#city").html(cityHtml);

        // make temp a string and output to page
        var tempCel = weather.main.temp;
        var tempFar = (weather.main.temp * 1.8 + 32)
          // unit we are showing now
        var currentUnit = "celcius"

        var tempHtml = "";
        tempHtml += "<h3>";
        tempHtml += tempCel;
        tempHtml += "&#x2103</h3>";
        $("#temp").html(tempHtml);

        // button that switches celcius to farenheit
        $("#unitChanger").click(function() {
          if (currentUnit === "celcius") {
            currentUnit = "farenheit";
            tempHtml = "";
            tempHtml += "<h3>";
            tempHtml += tempFar;
            tempHtml += "&#x2109</h3>";
            $("#temp").html(tempHtml);
          } else {
            currentUnit = "celcius";
            tempHtml = "";
            tempHtml += "<h3>";
            tempHtml += tempCel;
            tempHtml += "&#x2103</h3>";
            $("#temp").html(tempHtml);
          }
        });
        // descriptive weather
        // var descWeather = (weather.weather[0].description);
        var descWeather = "<h3>";
        descWeather += (weather.weather[0].description);
        descWeather += "</h3>";
        $("#description").html(descWeather);

        // adding the icons from the api
        var icon = (weather.weather[0].icon);
        var iconHtml = "";
        iconHtml += "<img src='http://openweathermap.org/img/w/";
        iconHtml += icon;
        iconHtml += ".png' class='center-block' id='weatherIcon' height='100'></img>";
        $("#icon").html(iconHtml);
        //console.log(icon);
      });
    });
  };
});
// API Call - api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID={APIKEY}