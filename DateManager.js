const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default class DateManager {
  constructor() {
    this.date = new Date();
    this.formattedDate = {};
    this.time = {};
  }

  getCurrentDate() {
    this.date = new Date();
  }

  getFormattedDay() {
    return DAYS[this.date.getDay()];
  }

  getFormattedMonth() {
    return MONTHS[this.date.getMonth()];
  }

  getFormattedDate() {
    return this.formattedDate;
  }

  setFormattedDate() {
    this.formattedDate = {
      day: this.getFormattedDay(),
      date: this.date.getDate(),
      month: this.getFormattedMonth(),
      year: this.date.getFullYear(),
    };
  }

  getFormattedDateString() {
    return `${this.formattedDate.day}, ${this.formattedDate.month} ${this.formattedDate.date}, ${this.formattedDate.year}`;
  }

  appendFormattedDateToDOM(element) {
    element.innerHTML = `<p>${this.getFormattedDateString()}</p>`;
  }

  getFormattedHours() {
    return (this.date.getHours() + 24) % 12 || 12;
  }

  getFormattedMinutes() {
    const minutes = this.date.getMinutes();
    if (minutes < 10) {
      return "0" + minutes;
    }
    return minutes;
  }

  getTimeMeridiem() {
    if (this.date.getHours() >= 12) {
      return "PM";
    } else {
      return "AM";
    }
  }

  getFormattedTime() {
    return `${this.getFormattedHours()}:${this.getFormattedMinutes()}${this.getTimeMeridiem()}`;
  }

  appendFormattedTimeToDOM(element) {
    element.innerHTML = `<p>${this.getFormattedTime()}</p>`;
  }
}
