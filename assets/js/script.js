var userFormEl = document.querySelector("#user-form");
var cityInput = document.querySelector("#citysearch");
var stateSelect = document.querySelector("#stateselect");




var getWeatherData = function(/*pass in coordinates*/) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&units=imperial&appid={API key}";

    fetch(requestUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) { //these two lines might not be right
                //call function to insert data into correct elements
            });
        } 
    })
    .catch(function(error) {
        alert("Unable to retrieve weather data");
    });
};

var getCoordinates = function(cityName, stateCode) {
    //format openweather url
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateCode + ",US&limit=1&appid=12aa7dcc32e49f0342370d0c3b3204d7";
    

    //make a request to the url
    fetch(requestUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                //getWeatherData(/*pass in data to reference lat and lon coordinates*/);
            });
        } else {
            alert("Error: Please enter valid location");
        }
    })
    .catch(function(error) {
        alert("Unable to retrieve weather data");
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityInput.value.trim();
    var stateCode = stateSelect.value.trim();

    if (cityName, stateCode) {
        getCoordinates(cityName, stateCode);
        cityInput.value = "";
    } else {
        alert("Please enter city and state");
    }
};


userFormEl.addEventListener("submit", formSubmitHandler);

//TODO:
// * call api to find coordinates from city name and state code inputs
// * call api to find weather data and change temperature units to fahrenheit in url
// * maybe hardcode country code as United States