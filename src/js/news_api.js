import {currentDate, sevenDaysAgo} from './constants.js';

export class NewsApi {
  getNews (inputRequest) {
    return fetch(`https://newsapi.org/v2/everything?q=${inputRequest}&pageSize=100&language=ru&from=${sevenDaysAgo}&to=${currentDate}&apiKey=a77a12e2e4484b4fb5cc12d192f94b00`, {
      method: 'GET'
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}