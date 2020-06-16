$(document).ready(function () {
  console.log("JavaScript LINKED!");

  function searchForCity(city) {
    var dateToday = moment().format("L");
    var APIkey = "6340db1bd8528765d6e74f5851c1d26a";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      APIkey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      //render the searched city AND the current date
      var searchedCity = $("#current-city").text(
        response.name + " " + dateToday
      );
      console.log(searchedCity);
      //now we need to get the information for that city
      //temperature
      var cityTemp = $("#temperature").text(response.main.temp);
      console.log(response.main.temp);
      //humidity
      var cityHumidity = $("#humidity").text(response.main.humidity + "%");
      console.log(response.main.humidity);
      //wind
      var cityWind = $("#wind").text(response.wind.speed + " MPH");
      console.log(response.wind.speed);

      //NEED SEPARATE API CALL FOR UV RAYS!

      //get lat and long from last call
      var lat = response.coord.lat;
      console.log(lat);
      var long = response.coord.lon;
      console.log(long);

      // now let's do the api call

      var UVurl =
        "http://api.openweathermap.org/data/2.5/uvi?appid=" +
        APIkey +
        "&lat=" +
        lat +
        "&lon=" +
        long;

      $.ajax({
        url: UVurl,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        $("#uv").text(response.value);

        // 5 day forecast call
      });

      var forecastURL =
        "api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=" +
        APIkey;
      $.ajax({
        url: forecastURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
      });
      // end of promise below
    });
  }

  var searchButtonEl = $("#searchBtn");

  searchButtonEl.on("click", function () {
    var city = $("#searchCity").val();
    searchForCity(city);
    //call function to be written that renders the buttons
    //search for last city searched can be saved as a separate value in local storage or grab last element in array and have that load on page load
  });
});

// PSEUDOCODING:
//get our API key
//store whatever the user searched for in a variable
//add that to the URL query link
//
