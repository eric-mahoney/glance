/*
 * This class has been deprecated now that unsplash has changed their API
 * May update this in the future to change to a different API
 * ... but if I did that then you wouldn't be reading this
 */

export default class PhotoManager {
  constructor() {
    this.photo = "";
  }

  async getPhotoFromUnsplash() {
    const url = getPhotoURL();
    const request = await fetch(url);
    const data = await request.json();
    this.photo = data;
    return this.photo;
  }

  getPhotoURL() {
    if (isMobileView()) {
      return "https://source.unsplash.com/1242x2688/?nature,water";
    } else {
      return "https://source.unsplash.com/1920x1080/?nature,water";
    }
  }

  isMobileView() {
    return window.innerWidth < 800;
  }

  setBackground(element) {
    const gradient = "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), ";
    element.style.background = gradient + `url('${this.photo.url}')`;
    element.style.backgroundRepeat = "no-repeat";
    element.style.backgroundPosition = "center center";
    element.style.backgroundSize = "cover";
  }
}
