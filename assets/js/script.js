var cityName = "placeholder"; //city name input from user
var stateCode = "placeholder"; //maybe make a dropdown of states

function getCoordinates() {
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + ",{state code},{country code}&limit={limit}&appid={API key}"
}

//TODO:
// * call api to find coordinates from city name and state code inputs
// * call api to find weather data and change temperature units to fahrenheit in url
// * maybe hardcode country code as United States