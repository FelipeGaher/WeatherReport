$(document).ready(function() {
  var lat;
  var lon;
  var tempCels;
  var tempFahr;
  var tempKelv;
  var tempFlag = true;


  //FIRST option to get GEOLOCATION
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);

      lat = position.coords.latitude;
      lon = position.coords.longitude;
/*
    });
  }

  //SECOND option to get GEOLOCATION
  //using IP-API Json to get the position.
  $.getJSON("http://ip-api.com/json", function(dataPosition) {
    lat = dataPosition.lat;
    lon = dataPosition.lon;
*/
    var code = "4fba7be048b56f36a5bf4b2568bebd7e";
    var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + code;
    //Get openWeather JSON
    $.getJSON(api, function(data) {
      var cityName = data.name;
      var weatherDesc = data.weather[0]
        .description;
      tempKelv = data.main.temp;
      tempCels = ((tempKelv - 273.15)).toFixed(2);
      tempFahr = ((tempKelv) * (9 / 5) - 459.67).toFixed(2);
      var windSpeed = (data.wind.speed).toFixed(2);
      console.log(tempFahr);

      console.log(tempCels);

      $("#cityName").html(cityName);
      $("#weatherDesc").html(weatherDesc);
      $("#windSpeed").html(windSpeed + " m/s");
      $("#temp").html(tempCels + " °C");

      //Temp Celsius/Fahrenheit changer logic
      $("#temp").click(function() {
        if (tempFlag === false) {
          $("#temp").html(tempCels + " °C");
          tempFlag = true;
        } else {
          $("#temp").html(tempFahr + " °F");
          tempFlag = false;
        }
      });
      console.log(tempCels);
      if(tempCels>15){
          $("body").css("background-image", "url(http://www.v3wall.com/wallpaper/1920_1080/1104/1920_1080_20110404091049781819.jpg)");
      }else if(tempCels<15 && tempCels>0){
        $("body").css("background-image", "url(http://cdn.paper4pc.com/images/cloudy-landscape-wallpaper-1.jpg)");
      }else{
        $("body").css("background-image", "url(http://eskipaper.com/images/snow-landscape-1.jpg)");
      }
    });
  });

  //FIRST option to get GEOLOCATION
  // }
  //FIRST option to get GEOLOCATION



});
