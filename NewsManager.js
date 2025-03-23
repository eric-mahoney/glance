import { NEWS_API_KEY } from "./config.js";

export default class NewsManager {
  constructor() {
    // all of the raw data we get back from NYT
    this.newsData = {};
    // the "processed" (trimmed and shuffled) articles to display
    this.processedNewsData = {}
  }

  async getNews() {
    const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${NEWS_API_KEY}`;
    const request = await fetch(url);
    const data = await request.json();
    this.newsData = data;
  }

  getProcessedNews() {
    const shuffledArticles = this.shuffleNewsArticles(this.newsData.results);
    const fiveNewsArticles = this.getFiveNewsArticles(shuffledArticles);
    this.processedNewsData = fiveNewsArticles
  }

  // when we query the API, we get about 20 results back, 
  // but they're always in the same order. We shuffle these
  // on each reload just so the user sees different articles
  shuffleNewsArticles(articles) {
    return articles.sort(() => 0.5 - Math.random());
  }

  // since this is just supposed to be news at a glance I didn't 
  // want to serve all 20 articles at the same time, so we just shuffle
  // all the articles first then slice off the top 5 to show to them
  getFiveNewsArticles(articles) {
    return articles.slice(0, 5);
  }

  appendAllNewsArticlesToElement(element) {
    const newsArticles = this.generateAllNewsArticlesHTML()
    element.innerHTML = `
      <div class="news-article-container">
        ${newsArticles}
      </div>
    `
  }

  generateAllNewsArticlesHTML() {
    return this.processedNewsData.reduce((acc, curr) => acc += this.generateSingleArticleHTML(curr), '')
  }

  generateSingleArticleHTML(article) {
    return `
        <div class="news-wrapper">
          <div class="news__image"><img src="${article.multimedia[2].url}"></div>
          <div class="news__info">
            <h3 class="news__title"><a class="news__link" href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a></h3>
            <p class="news__source">${article.section} &#x2022; ${this.removeTimeFromPublishedDate(article.published_date)}</p>
          </div>
        </div>`;
  }

  removeTimeFromPublishedDate(date) {
    return date.split("T")[0];
  }
}
