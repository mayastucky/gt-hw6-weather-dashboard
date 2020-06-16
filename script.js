$(document).ready(function () {
  console.log("JavaScript LINKED!");

  var city = "Brunswick";
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
    var searchedCity = $("#current-city").text(response.name + " " + dateToday);
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
    // var cityUV = $("#uv").text(response.)
  });
});

// PSEUDOCODING:
//get our API key
//store whatever the user searched for in a variable
//add that to the URL query link
//
