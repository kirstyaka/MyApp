
function formatDate() {
  let now = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDay = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentYear = now.getFullYear();
  let currentHour = now.getHours();
    if (currentHour < 10) {
    currentHour = `0${currentHour}`;

  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  
  let currentTime = document.querySelector("#time-day");
  currentTime.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} ${currentHour}:${currentMinutes}`;
  
return currentTime;
}
formatDate();

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day]; 
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastDisplay = `<div class="row">`;
  forecast.forEach(function(forecastDay, index){
if (index < 6) {
 forecastDisplay = forecastDisplay + 
  `    
          <div class="col-2">
            <div class="forecast-day">
              <h5>${formatDay(forecastDay.dt)}</h5>
              <img
                src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                id="forecast-icon"
                alt=""
              />
              <div class="forecast temps">
                <span class="forecast-min">${Math.round(forecastDay.temp.min)}°C</span>
                <span class="forecast-max">${Math.round(forecastDay.temp.max)}°C</span>
              </div>
            </div>
      </div>`;
}
})
  
forecastDisplay = forecastDisplay + `</div>`;
forecastElement.innerHTML = forecastDisplay;
}

function getForecast(coordinates) {
let apiKey = "010a91f8ea00ef6449ae49dee5b2b4ae";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("#display-city").innerHTML = response.data.name;

  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp-number");
  tempElement.innerHTML = `${temp}°`

  let currentWeather = response.data.weather[0].icon;
  let currentWeatherElement = document.querySelector("#current-weather");
  currentWeatherElement.setAttribute("src", `https://openweathermap.org/img/wn/${currentWeather}@2x.png`);

  let conditions = response.data.weather[0].description;
  let conditionsElement = document.querySelector("#condition");
  conditionsElement.innerHTML = `${conditions}`

  let windSpeed = Math.round(response.data.wind.speed);
  windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `: ${windSpeed}`

  let humidity = response.data.main.humidity;
  humidElement = document.querySelector("#humidity");
  humidElement.innerHTML = `${humidity}`

  let minTemp = Math.round(response.data.main.temp_min);
  let minTempElement = document.querySelector("#min-temp");
  minTempElement.innerHTML = `${minTemp}`

  let maxTemp = Math.round(response.data.main.temp_max);
  let maxTempElement = document.querySelector("#max-temp");
  maxTempElement.innerHTML = `${maxTemp}`

  celciusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function city(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let apiKey = "010a91f8ea00ef6449ae49dee5b2b4ae";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

let cityForm = document.querySelector("#btn-1");
cityForm.addEventListener("click", city);

function getPosition(position) {
navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentButton = document.querySelector("#btn-2");
currentButton.addEventListener("click", getPosition);

function currentPosition(position) {

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "010a91f8ea00ef6449ae49dee5b2b4ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function showFahrenheit(event){
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
 let fahrenheitTemp = (celciusTemperature * 9) / 5 +32;
 let tempElement = document.querySelector("#temp-number");
 tempElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit"); 
fahrenheitLink.addEventListener("click", showFahrenheit);

function showCelcius(event){
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#temp-number");
  tempElement.innerHTML = Math.round(celciusTemperature);
}

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showCelcius);

let celciusTemperature = null;