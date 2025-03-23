export class NewsManager {
  constructor() {
    this.quote = "";
  }

  async getQuote() {
    const url = "https://quotes.rest/qod?language=en";
    const request = await fetch(url);
    const data = await request.json();
    this.quote = data.contents.quotes[0];
    return this.quote;
  }

  setQuote(element) {
    element.innerHTML = '"' + this.quote.quote + '"';
    element.innerHTML = this.quote.author;
  }
}
