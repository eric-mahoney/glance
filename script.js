// import PhotoManager from "./PhotoManager";
import DateManager from "./DateManager.js";

// function initializePhotoFeatures() {
// deprecated code that was used for the photo manager
// const body = document.querySelector("body");
// const photoManager = new PhotoManager();
// photoManager.getPhotoFromUnsplash();
// photoManager.getPhotoURL();
// photoManager.setBackground(body);
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

function main() {
  // initializePhotoFeatures();
  initializeDateFeatures();
}

main();
