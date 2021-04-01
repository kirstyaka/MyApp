
let now = new Date();

let time = document.querySelector("#time-day");

let hour = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

time.innerHTML = `${day} ${hour}:${minutes}`;


function displayWeather(response) {
  document.querySelector("#display-city").innerHTML = response.data.name;

  let temp = Math.round(response.data.main.temp);
  console.log(response.data);
  let tempElement = document.querySelector("#temp-number");
  tempElement.innerHTML = `${temp}`

  let conditions = response.data.weather[0].description;
  let conditionsElement = document.querySelector("#condition");
  conditionsElement.innerHTML = `${conditions}`

  let windSpeed = Math.round(response.data.wind.speed);
  windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${windSpeed}`

 let humidity = response.data.main.humidity;
  console.log(humidity);
  humidElement = document.querySelector("#humidity");
  humidElement.innerHTML = `${humidity}`

  let minTemp = Math.round(response.data.main.temp_min);
  let minTempElement = document.querySelector("#min-temp");
  minTempElement.innerHTML = `${minTemp}`

  let maxTemp = Math.round(response.data.main.temp_max);
  let maxTempElement = document.querySelector("#max-temp");
  maxTempElement.innerHTML = `${maxTemp}`
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

//function celciusTemp(event) {
  //let temperature = document.querySelector("#temp-number");
  

  //alert(`your secret password is: ${passwordInput.value}`);
//}

//let passwordForm = document.querySelector("#password-form");
//passwordForm.addEventListener("click", celcius);
