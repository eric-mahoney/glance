/**
 * Retrieves a photo from Unsplash's API and sets it as the background
 * @return {string} The URL to the photo
 */

async function getPhoto() {
  const url = "https://source.unsplash.com/1920x1080/?nature,water"; // url to a random unsplash image
  const request = await fetch(url);
  return await request;
}

/**
 * Sets the background to the body
 */

function setBackground(photo) {
  const body = document.getElementById("backgroundImage");
  const gradient = "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 75%), ";
  photo.then((data) => {
    console.log(data.url);
    body.style.background = gradient + `url('${data.url}')`;
  });
}

/**
 * Returns the current date
 * @return {date} the current date
 */

function getDate() {
  var date = new Date();
  return {
    minute: date.getMinutes(),
    hour: date.getHours(),
    period: "",
    day: date.getDay(),
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
}

/**
 * Returns the current date
 * @param {object} date the current date as an object
 * @return {object} the current date as an object
 */

function mapDate(date) {
  // the mapping for which value will correspond to which day
  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  // the mapping for which value will correspond to which month
  const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  // retrieves what day and month it is from the object
  currentDay = date["day"];
  currentMonth = date["month"];

  // looks up what it corresponds to and replaces the value with the correct string
  date["day"] = days[currentDay];
  date["month"] = months[currentMonth];

  // returns the object with the updated values
  return date;
}

/**
 * Sets the span elements to the current date
 * @param {string} day the current weekday (Monday, Tuesday, etc.)
 * @param {string} date the current day (15, 16, 17, etc.)
 * @param {string} month the current month (January, February, etc.)
 * @param {string} year the current year (2020, 2021, etc.)
 */

function setDate(date) {
  document.getElementById("weekday").innerHTML = date["day"];
  document.getElementById("date").innerHTML = date["date"];
  document.getElementById("month").innerHTML = date["month"];
  document.getElementById("year").innerHTML = date["year"];
}

/**
 *
 */

function mapTime(date) {
  if (date.hour >= 12) {
    date.period = "pm";
  } else {
    date.period = "am";
  }
  date.minute = date.minute;

  if (date.minute < 10) {
    date.minute = "0" + date.minute;
  }
  date.hour = (date.hour + 24) % 12 || 12;
  return date;
}

/**
 *
 */

function setTime(date) {
  document.getElementById("minute").innerHTML = date["minute"];
  document.getElementById("hour").innerHTML = date["hour"];
  document.getElementById("period").innerHTML = date["period"];
}

/**
 * retrives news in JSON format from NewsAPI :: https://newsapi.org/docs
 * @return {JSON} data containing information about the news
 */

async function getNews() {
  console.log("getting news");
  const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=RJG7b0Go0sLnc09WTpg4N7mGtZCbHJSf`;
  const request = await fetch(url);
  request.json().then((data) => {
    setNews(data);
  });
}

/**
 * adds news to the DOM
 * @param {JSON} news containing information about the news
 */

function setNews(news) {
  const newsContainer = document.getElementById("news");
  newsContainer.innerHTML = "";
  const shuffled = news.results.sort(() => 0.5 - Math.random());
  const articles = shuffled.slice(0, 5);
  articles.map((data) => {
    const finalDate = data.published_date.split("T")[0]; // removing the time from the published date
    newsContainer.innerHTML += `
      <div class="news-wrapper">
      <div class="news__image"><img src="${data.multimedia[2].url}"></div>
      <div class="news__info">
      <h3 class="news__title"><a class="news__link" href="${data.url}" target="_blank" rel="noopener noreferrer">${data.title}</a></h3>
      <p class="news__source">${data.section} &#x2022; ${finalDate}</p>
      </div>
      </div>`;
  });
}

async function getLocID(lat, long) {
  const url = `https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`;
  const request = await fetch(url);
  return await request.json();
}

/**
 * adds weather to the dom
 */

function geoSuccess(data) {
  const lat = data.coords.latitude;
  const long = data.coords.longitude;

  document.getElementById("coords").innerHTML = `(${lat}, ${long})`;

  getLocID(lat, long).then((data) => {
    getWeather(data[0].woeid);
  });
}

/**
 * adds weather to the dom
 */

async function getWeather(id) {
  const url = `https://www.metaweather.com/api/location/${id}`; // url to a random unsplash image
  const request = await fetch(url);
  return await request.json();
}

/**
 * adds error message to the dom
 */

function geoErr() {
  document.getElementById("weather").innerHTML = "could not get location";
}

/**
 * retrives the quote of the day from a REST API
 * @return {JSON} data containing information about the quote such as author and content
 */

async function getQuote() {
  const url = "https://quotes.rest/qod?language=en"; // url to a random unsplash image
  const request = await fetch(url);
  return await request.json();
}

/**
 * sets the quote in the DOM
 * @param {JSON} quote data containing information about the quote
 */

function setQuote(quote) {
  quote.then((data) => {
    document.querySelector(".quote__content").innerHTML = '"' + data.contents.quotes[0].quote + '"';
    document.querySelector(".quote__author").innerHTML = data.contents.quotes[0].author;
  });
}

/**
 * function calls
 */

function main() {
  // setting the background
  const photo = getPhoto();
  setBackground(photo);

  // setting the date
  const currentDate = getDate();
  const mappedDate = mapDate(currentDate);
  setDate(mappedDate);

  // set the time
  const mappedTime = mapTime(currentDate);
  setTime(mappedTime);

  // set the quote
  const quote = getQuote();
  setQuote(quote);

  // set the news
  getNews();

  // check if the browser has geolocation feature
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(geoSuccess, geoErr);
  } else {
    document.getElementById("weather").innerHTML = "geolocation not supported by browser";
  }
}

main();
