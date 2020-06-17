$(document).ready(function () {
  console.log("JavaScript LINKED!");
  var historyArray = [];

  var dateToday = moment().format("L");
  function searchForCity(city) {
    // var dateToday = moment().format("L");
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
      $("#current-city").empty();
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

      //Now we need to get the current general weather condition
      var currentweather = response.weather[0].main;
      if (currentweather === "Rain") {
        var icon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/09d@2x.png"
        );
        icon.attr("style", "height: 40px; width: 40px");
      } else if (currentweather === "Clouds") {
        var icon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/04d@2x.png"
        );
        icon.attr("style", "height: 40px; width: 40px");
      } else if (currentweather === "Clear") {
        var icon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/01d@2x.png"
        );
        icon.attr("style", "height: 40px; width: 40px");
      } else if (currentweather === "Drizzle") {
        var icon = $("<img>").attr("src");
        icon.attr("style", "height: 40px; width: 40px");
      } else if (currentweather === "Snow") {
        var icon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/13d@2x.png"
        );
        icon.attr("style", "height: 40px; width: 40px");
      }
      $("<img>").empty();
      //append the icons
      $("#current-city-card").append(icon);
      //NEED SEPARATE API CALL FOR UV RAYS!

      //get lat and long from last call
      var lat = response.coord.lat;
      console.log(lat);
      var long = response.coord.lon;
      console.log(long);

      //UV API CALL

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
      });

      //forecast api call
      var forecastURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=" +
        APIkey;
      $.ajax({
        url: forecastURL,
        method: "GET",
      }).then(function (response) {
        $("#forecast").empty();
        console.log(response);
        var results = response.list;
        //generating the dates to progress was aided by https://github.com/cmelby/WeatherDashboard
        //need to get important info from the forecast
        for (var i = 0; i < results.length; i += 8) {
          //date
          var date = results[i].dt_txt;
          var setDate = date.substr(0, 10);
          console.log("date", date);
          //temperature
          var temperature = results[i].main.temp;
          //humidity
          var humidity = results[i].main.humidity;
          //dynamically create the card

          //creates the entire card
          var forecastEl = $(
            "<div class='card text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>"
          );
          //create header with date
          //NOT APPENDING CORRECTLY
          var dateHeadEl = $("<h5 class = 'card-title'>").text(setDate);
          //create paragraph with temperature
          var tempEl = $("<p class= 'card-text'>").text("Temp: " + temperature);
          //create paragraph with humidity
          var humidityEl = $("<p class = 'card-text'>").text(
            "Humidity: " + humidity + "%"
          );

          //icons!
          var generalWeather = results[i].weather[0].main;
          if (generalWeather === "Rain") {
            var icon = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/wn/09d@2x.png"
            );
            icon.attr("style", "height: 40px; width: 40px");
          } else if (generalWeather === "Clouds") {
            var icon = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/wn/04d@2x.png"
            );
            icon.attr("style", "height: 40px; width: 40px");
          } else if (generalWeather === "Clear") {
            var icon = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/wn/01d@2x.png"
            );
            icon.attr("style", "height: 40px; width: 40px");
          } else if (generalWeather === "Drizzle") {
            var icon = $("<img>").attr("src");
            icon.attr("style", "height: 40px; width: 40px");
          } else if (generalWeather === "Snow") {
            var icon = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/wn/13d@2x.png"
            );
            icon.attr("style", "height: 40px; width: 40px");
          }
          forecastEl.append(dateHeadEl);
          forecastEl.append(icon);
          forecastEl.append(tempEl);
          forecastEl.append(humidityEl);
          $("#forecast").append(forecastEl);
        }
      });
      // end of promise below
    });
  }

  function pageLoad() {}

  var searchButtonEl = $("#searchBtn");

  searchButtonEl.on("click", function () {
    event.preventDefault();
    var city = $("#searchCity").val();
    searchForCity(city);
    renderButtons(city);

    //save to local storage
    //NEED USER

    // cityArray.push(userCity);
    // localStorage.setItem("cityName", JSON.stringify(cityArray));
    // searchForCity(city);
    // loadPage();
    //call function to be written that renders the buttons
    //search for last city searched can be saved as a separate value in local storage or grab last element in array and have that load on page load
  });

  function renderButtons(city) {
    historyArray.push(city);
    console.log(historyArray);
    localStorage.setItem("citySelected", JSON.stringify(historyArray));
    var cityArrayFromStorage = JSON.parse(localStorage.getItem("citySelected"));
    console.log(cityArrayFromStorage); //cityArrayFromStorage is a string and we need to turn it into an array
    $("#searched-cities").empty();

    cityArrayFromStorage.forEach(function (item) {
      console.log(item);
      var cityButtons = $("<button>");
      cityButtons.attr("class", "btn btn-light");
      cityButtons.text(item);
      var searchedCities = $("#searched-cities");
      //searchedCities.empty();
      searchedCities.append(cityButtons);
    });
  }

  // function loadPage() {
  //   var lastSearched = JSON.parse(localStorage.getItem("cityName"));
  //   var searchedButtons = $(
  //     "<button class = 'btn bg-white rounded' style='width: 12rem;'>"
  //   ).text(lastSearched);
  //   var buttonArea = $("<div>");
  //   buttonArea.append(searchedButtons);
  //   $("#searchedcities").prepend(buttonArea);
  // }
});

// PSEUDOCODING:
//get our API key
//store whatever the user searched for in a variable
//add that to the URL query link
//
