import {Card} from './card.js';
import {CardsList} from './cards_list.js';
import {StorageData} from './storage_data.js';
import {NewsApi} from '../js/news_api.js';

import {ShortStatistics} from "../js/short_statistics.js";
import {Table} from "../js/table.js";

import {GithubApi} from '../js/github_api.js';
import {Slide} from "../js/slide.js";
import {SlidesList} from "../js/slides_list.js";
import Glide from '@glidejs/glide';
import {glideConfig} from '../js/glide_config.js';


export const currentDate = (new Date);
const fullDaysPassed = 6; //За сколько дней нужны новости, к этому числу в итоге прибавится сегодняшний день
const gapSixDaysInMS = currentDate - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - fullDaysPassed);
const dateWithoutUTC = new Date(Date.now() - gapSixDaysInMS); // вычитаем количество милисекунд за интересуемый промежуток времени
export const sevenDaysAgo = new Date(dateWithoutUTC);
export const fromDate = 'from=' + sevenDaysAgo.toJSON().slice(0, 10);
export const today = 'to=' + currentDate.toJSON().slice(0, 10);



//страница index.js
export const regExpHTTPLinkFirst = new RegExp(/(https|http)?:\/\/(www.)?[^-_.\s](\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})?(:\d+)?(\w+.[a-z]{2,})*(.\w+)*\/*\w*\/*\w*\/*\w*\/*\w+(\/*#?)? /i); // регулярное выражение отсеивающее ссылку в начале текста
export const buttonSearch = document.querySelector('.header__search-button');
export const input = document.querySelector('.header__search-input');
export const cardArguments = (...args) => new Card (...args);
// export const storageData = new StorageData();
// export const cardsList = new CardsList(cardArguments);
// export const newsApi = new NewsApi();


// Массив для выдачи случайного изображения

export const lostedPicturesReplacement = [
  './src/images/search-results/0.png',
  './src/images/search-results/1.png',
  './src/images/search-results/2.png',
  './src/images/search-results/3.png',
  './src/images/search-results/4.png',
  './src/images/search-results/5.png',
  './src/images/search-results/6.png',
  './src/images/search-results/7.png',
  './src/images/search-results/8.png',
  './src/images/search-results/9.png',
  './src/images/search-results/10.png',
  './src/images/search-results/11.png',
  './src/images/search-results/12.png',
  './src/images/search-results/13.png',
  './src/images/search-results/14.png',
  './src/images/search-results/15.png',
  './src/images/search-results/16.png',
  './src/images/search-results/17.png',
  './src/images/search-results/18.png',
  './src/images/search-results/19.png',
  './src/images/search-results/20.png',
  './src/images/search-results/21.png',
  './src/images/search-results/22.png',
  './src/images/search-results/23.png',
  './src/images/search-results/24.png',
  './src/images/search-results/25.png',
  './src/images/search-results/26.png',
  './src/images/search-results/27.png',
  './src/images/search-results/28.png',
  './src/images/search-results/29.png',
  './src/images/search-results/30.png'
];



// страница details.js

export const recivedData = JSON.parse(localStorage.getItem("NewsApiLocalStorage"));
export const recivedDataRequest = localStorage.getItem("NewsApiRequest");

// Регулярное выражение игнорируещее регистр словосочетаний
export const regExpRequest = new RegExp('\\s' + recivedDataRequest +'\\s', 'gi');
export const shortStatistics = new ShortStatistics;
export const table = new Table;



// страница about.js

export const githubApi = new GithubApi({
  baseUrl: 'https://api.github.com/repos/DmJavaScript/YandexDiplomaProject/commits',
  headers: {
    authorization: 'ca68fe15b70347d75428771071b8dfe19e1a8ba5',
    'Content-Type': 'application/json'
  }
});

export const createSlide = (...args) => new Slide(...args);
export const slidesList = new SlidesList();
export const glide = new Glide(glideConfig.container, glideConfig.settings);
