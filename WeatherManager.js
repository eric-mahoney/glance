export class WeatherManager {
  constructor() {
    this.weather = {};
    this.latitude = 0;
    this.longitude = 0;
  }

  isGeolocationEnabled() {
    if (window.navigator.geolocation) {
      return true;
    } else {
      return false;
    }
  }

  getUserLocation() {
    if (this.isGeolocationEnabled()) {
      window.navigator.geolocation.getCurrentPosition(this.getUserLocationSuccess, this.getUserLocationError);
    }
  }

  getUserLocationSuccess(position) {
    this.setLatitudeAndLongitude(position.coords.latitude, position.coords.longitude);
  }

  getUserLocationError() {
    document.getElementById("weather").innerHTML = "geolocation not supported by browser";
  }

  async getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=b02825401afe8e67744e41e265592144`;
    const request = await fetch(url);
    const data = await request.json();
    this.weather = data;
    return this.weather;
  }

  convertKelvinToFahrenheit(kelvin) {
    return Math.ceil((kelvin * 9) / 5 - 459.67);
  }

  setLatitudeAndLongitude(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  appendGeolocationErrorToDOM(element) {
    element.innerHTML = "err: browser blocked geolocation api";
  }

  appendGeolocationSuccessToDOM(element) {
    element.innerHTML = `
      <div class="weather">
      <h2 id="weather__city">${this.weather.name}, ${this.weather.sys.country}</h2>
      <p id="weather__condition">${this.weather.weather[0].description}</p>
      <img id="weather__icon" src="/assets/weather-icons/${this.weather.weather[0].icon}.svg">
      <div id="weather__temperature">
         <p id="weather__current">${this.convertKelvinToFahrenheit(this.weather.main.temp)}</p>
         <p id="weather__range">${this.convertKelvinToFahrenheit(this.weather.main.temp_min)} - ${this.convertKelvinToFahrenheit(this.weather.main.temp_max)}</p>
      </div>
      <div class="weather__row">
        <p class="weather__label">feels like</p>
        <p class="weather__data">${this.convertKelvinToFahrenheit(this.weather.main.feels_like)}</p>
      </div>
      <div class="weather__row">
        <p class="weather__label">wind</p>
        <p class="weather__data">${this.weather.main.speed} mph</p>
      </div>
      <div class="weather__row">
        <p class="weather__label">humidity</p>
        <p class="weather__data">${this.weather.main.humidity}%</p>
      </div>
      <div class="weather__row">
        <p class="weather__label">cloudiness</p>
        <p class="weather__data">${this.weather.clouds.all}%</p>
      </div>
    </div>
    `;
  }
}
