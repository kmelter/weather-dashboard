var cityName = document.getElementById("citysearch").textContent; //city name input from user
var stateCode = "placeholder"; //maybe make a dropdown of states

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function stateSelect() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}

function getCoordinates() {
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + ",{state code},US&units=imperial&appid={API key}"
}

//TODO:
// * call api to find coordinates from city name and state code inputs
// * call api to find weather data and change temperature units to fahrenheit in url
// * maybe hardcode country code as United States