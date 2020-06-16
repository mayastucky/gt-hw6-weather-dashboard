$(document).ready(function () {
  console.log("JavaScript LINKED!");

  //   var city = $("#userCity").val();
  var city = "Atlanta";
  var APIkey = "6340db1bd8528765d6e74f5851c1d26a";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIkey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});

// PSEUDOCODING:
//get our API key
//store whatever the user searched for in a variable
//add that to the URL query link
//
