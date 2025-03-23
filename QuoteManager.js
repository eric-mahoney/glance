export default class QuoteManager {
  constructor() {
    this.quote = "";
  }

  // this API may be deprecated as well, looks like everything
  // is returning 401 unauth errors now despite being a public api
  // even on their website their swagger docs return 401
  // maybe it needs a key now, but it looks like they may only have a few paid tiers
  async getQuote() {
    const url = "http://quotes.rest/qod.json";
    const request = await fetch(url);
    const data = await request.json();
    this.quote = data.contents.quotes[0];
  }

  generateQuoteHTML() {
    return `
      <p class="quote__content">${this.quote.quote}</p>
      <p class="quote__author">${this.quote.author}</p>
    `
  }

  appendQuoteToDOM(element) {
    const generatedQuoteHTML = this.generateQuoteHTML()
    element.innerHTML = `${generatedQuoteHTML}`
  }
}
