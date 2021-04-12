let currentDate = new Date();
console.log(currentDate.getDay());
console.log(currentDate.getHours());
var currentCity = document.querySelector("#main");

function updateDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let fullday = days[currentDate.getDay()];
  return fullday;
}
let timeNow = document.querySelector("#current-time");
timeNow.innerHTML = ` ${updateDate()}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;

function cityInput(event) {
  event.preventDefault();
  let input = document.querySelector("#field");
  currentCity = document.querySelector("#main");
  currentCity.innerHTML = input.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric`;
  let apiKey = "533b988d775535f72a3aabd5a735b8a7";
  let units = `metric`;
  axios.get(`${apiUrl}&appid=${apiKey}&units=${units}`).then(showTemperature);
}
let updateCity = document.querySelector("#submit");
updateCity.addEventListener("click", cityInput);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#degrees").innerHTML = temperature + "°C";
}
function showTemperatureCurrentLocation(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#degrees").innerHTML = temperature + "°C";
  let city = response.data.name;
  document.querySelector("#main").innerHTML = city;
}
function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`;
  let apiKey = "533b988d775535f72a3aabd5a735b8a7";
  let units = "metric";

  axios
    .get(`${apiUrl}&appid=${apiKey}&units=${units}`)
    .then(showTemperatureCurrentLocation);
}
let updateTemperature = document.querySelector("#geo");
//updateTemperature.addEventListener("submit", currentLocation);

function test() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
