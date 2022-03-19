var userFormEl = document.querySelector("#user-form");
var cityInput = document.querySelector("#citysearch");
var stateSelect = document.querySelector("#stateselect");


var insertData = function(data) {
    var currentTemp = data.current.temp.toString();
    var currentWind = data.current.wind_speed.toString();
    var currentHumidity = data.current.humidity.toString();
    var currentUV = data.current.uvi.toString();

    document.getElementById("current-temp").textContent = currentTemp + " F";
    document.getElementById("current-wind").textContent = currentWind + " mph";
    document.getElementById("current-humidity").textContent = currentHumidity + "%";
    document.getElementById("current-uv").textContent = currentUV;

    for (i = 0; i < 5; i++) {
        //insert symbol
        document.getElementById("temp" + i).textContent = data.daily[i].temp.max.toString() + " F";
        //TODO: These two arent working for some reason:
        document.getElementById("wind" + i).textcontent = data.daily[i].wind_speed.toString() + " mph";
        document.getElementById("humidity" + i).textcontent = data.daily[i].humidity.toString() + "%";
    }

    if (currentUV === 1 || 2) {
        document.getElementById("current-uv").style.color = "white";
        document.getElementById("current-uv").style.backgroundColor = "green";
    }
    if (currentUV === 3 || 4) {
        document.getElementById("current-uv").style.color = "black";
        document.getElementById("current-uv").style.backgroundColor = "yellow";
    }
    if (currentUV > 5) {
        document.getElementById("current-uv").style.color = "white";
        document.getElementById("current-uv").style.backgroundColor = "red";
    }
};

var getWeatherData = function(data) {
    var latitude = data[0].lat.toString();
    var longitude = data[0].lon.toString();
    
    console.log(latitude);
    console.log(longitude);

    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=12aa7dcc32e49f0342370d0c3b3204d7";

    fetch(requestUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                insertData(data);
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
    
    console.log(cityName);
    console.log(stateCode);

    //make a request to the url
    fetch(requestUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                document.getElementById("selected-city").textContent = data[0].name;
                getWeatherData(data);
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
    var cityName = cityInput.value.trim().toLowerCase();
    var stateCode = stateSelect.value.trim();

    //TODO: store search in local storage

    if (cityName, stateCode) {
        getCoordinates(cityName, stateCode);
        // cityInput.value = "";
    } else {
        alert("Please enter city and state");
    }
};


userFormEl.addEventListener("submit", formSubmitHandler);

//TODO:
// * call api to find coordinates from city name and state code inputs
// * call api to find weather data and change temperature units to fahrenheit in url
// * maybe hardcode country code as United States