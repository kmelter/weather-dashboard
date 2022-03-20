var userFormEl = document.querySelector("#user-form");
var cityInput = document.querySelector("#citysearch");
var stateSelect = document.querySelector("#stateselect");





var update = function () {
    date = moment(new Date())
    datetime.html(date.format('L'));
};
      
// update current time each second
$(document).ready(function(){
    datetime = $('#date')
    update();
    setInterval(update, 1000);
});


var cityButton = function() {
    var cityName = $(this).attr("id").toLowerCase();
    var storageObject = localStorage.getItem(cityName);
    var stateCode = JSON.parse(storageObject).state;
    getCoordinates(cityName, stateCode);
};

var getButtons = function() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }

    for (i = 0; i < values.length; i++) {
        var parsedItem = JSON.parse(values[i]);
        console.log(parsedItem);
        var historyButton = document.createElement("button");
        historyButton.id = parsedItem.city;
        historyButton.classList.add("storage-button");
        historyButton.textContent = parsedItem.city.toUpperCase();
        document.getElementById("search-buttons").appendChild(historyButton);
        historyButton.addEventListener("click", cityButton);
    }
};

var insertData = function(data) {
    var currentTemp = data.current.temp.toString();
    var currentWind = data.current.wind_speed.toString();
    var currentHumidity = data.current.humidity.toString();
    var currentUV = data.current.uvi.toString();
    
    //TODO: get symbols
    document.getElementById("current-temp").textContent = currentTemp + " F";
    document.getElementById("current-wind").textContent = currentWind + " mph";
    document.getElementById("current-humidity").textContent = currentHumidity + "%";
    document.getElementById("current-uv").textContent = currentUV;

    for (i = 0; i < 5; i++) {
        
        //TODO: display dates for next five days in forecast
        document.getElementById("temp" + i).textContent = data.daily[i].temp.max.toString() + " F";
        //TODO: These two arent working for some reason:
        document.getElementById("wind" + i).textcontent = data.daily[i].wind_speed.toString() + " mph";
        document.getElementById("humidity" + i).textcontent = data.daily[i].humidity.toString() + "%";
    }

    if (currentUV < 3) {
        document.getElementById("current-uv").style.color = "white";
        document.getElementById("current-uv").style.backgroundColor = "green";
    }
    if (currentUV >= 3 && currentUV < 5) {
        document.getElementById("current-uv").style.color = "black";
        document.getElementById("current-uv").style.backgroundColor = "yellow";
    }
    if (currentUV >= 5) {
        document.getElementById("current-uv").style.color = "white";
        document.getElementById("current-uv").style.backgroundColor = "red";
    }

    cityInput.value = "";
    stateSelect.value = "";
};

var getWeatherData = function(data) {
    var latitude = data[0].lat.toString();
    var longitude = data[0].lon.toString();

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

    var weatherStorage = {
        city: cityName,
        state: stateCode
    };

    localStorage.setItem(cityName, JSON.stringify(weatherStorage));
    var historyButton = document.createElement("button");
    historyButton.textContent = cityName.toUpperCase();
    document.getElementById("search-buttons").appendChild(historyButton);

    if (cityName, stateCode) {
        getCoordinates(cityName, stateCode);
    } else {
        alert("Please enter city and state");
    }
};


userFormEl.addEventListener("submit", formSubmitHandler);

getButtons();
getDates();