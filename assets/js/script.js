var cityName = document.getElementById("citysearch");
var stateCode = document.getElementById("stateselect").value;

console.log(cityName);
console.log(stateCode);


var getWeatherData = function(/*pass in coordinates*/) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";

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
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateCode + ",US&units=imperial&appid={API key}"
    
    //make a request to the url
    fetch(requestUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) { //these two lines might not be right
                getWeatherData(/*pass in lat and lon coordinates*/);
            });
        } else {
            alert("Error: Please enter a city");
        }
    })
    .catch(function(error) {
        alert("Unable to retrieve weather data");
    });
};


$("#submitbutton").on("click", function() {
    getCoordinates();

});
//TODO:
// * call api to find coordinates from city name and state code inputs
// * call api to find weather data and change temperature units to fahrenheit in url
// * maybe hardcode country code as United States