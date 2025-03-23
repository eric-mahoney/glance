// import PhotoManager from "./PhotoManager";
import DateManager from "./DateManager.js";
import NewsManager from "./NewsManager.js";

// deprecated code that was used for the photo manager
// function initializePhotoFeatures() {
//    const body = document.querySelector("body");
//    const photoManager = new PhotoManager();
//    photoManager.getPhotoFromUnsplash();
//    photoManager.getPhotoURL();
//    photoManager.setBackground(body);
// }

function initializeDateFeatures() {
  const dateManager = new DateManager();
  const dateWrapper = document.querySelector(".header-text");
  dateManager.setFormattedDate();
  dateManager.appendFormattedDateToDOM(dateWrapper);

  const timeWrapper = document.querySelector(".time");
  setInterval(() => {
    dateManager.getCurrentDate();
    dateManager.appendFormattedTimeToDOM(timeWrapper);
  }, 1000);
}

async function initializeNewsFeatures() {
  const newsManager = new NewsManager();
  const newsWrapper = document.querySelector('#news')
  
  await newsManager.getNews();
  
  newsManager.getProcessedNews();
  newsManager.appendAllNewsArticlesToElement(newsWrapper)
}

function main() {
  // initializePhotoFeatures();
  initializeDateFeatures();
  initializeNewsFeatures();
}

main();
