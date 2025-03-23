class NewsManager {
  constructor() {
    this.data = {};
  }

  async getNews() {
    const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=RJG7b0Go0sLnc09WTpg4N7mGtZCbHJSf`;
    const request = await fetch(url);
    const data = await request.json();
    this.data = data;
    return this.data;
  }

  setNews(news) {
    const shuffledArticles = this.shuffleNewsArticles(news.results);
    const articles = this.getFiveNewsArticles(shuffledArticles);
  }

  shuffleNewsArticles(articles) {
    return articles.sort(() => 0.5 - Math.random());
  }

  getFiveNewsArticles(articles) {
    return articles.slice(0, 5);
  }

  appendNewsToDOM(element) {
    element.innerHTML = `
        <div class="news-wrapper">
        <div class="news__image"><img src="${this.data.multimedia[2].url}"></div>
        <div class="news__info">
        <h3 class="news__title"><a class="news__link" href="${this.data.url}" target="_blank" rel="noopener noreferrer">${this.data.title}</a></h3>
        <p class="news__source">${this.data.section} &#x2022; ${this.removeTimeFromPublishedDate(this.data.published_date)}</p>
        </div>
        </div>`;
  }

  removeTimeFromPublishedDate(date) {
    return date.split("T")[0];
  }
}
