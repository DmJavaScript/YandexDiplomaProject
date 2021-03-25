export const currentDate = (new Date);
export const fullDaysPassed = 6; //За сколько дней нужны новости, к этому числу в итоге прибавится сегодняшний день
export const gapSixDaysInMS = currentDate - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - fullDaysPassed);
export const dateWithoutUTC = new Date(Date.now() - gapSixDaysInMS); // вычитаем количество милисекунд за интересуемый промежуток времени
export const sevenDaysAgo = new Date(dateWithoutUTC);
export const fromDate = 'from=' + sevenDaysAgo.toJSON().slice(0, 10);
export const today = 'to=' + currentDate.toJSON().slice(0, 10);



//страница index.js

export const regExpHTTPLinkFirst = new RegExp(/(https|http)?:\/\/(www.)?[^-_.\s](\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})?(:\d+)?(\w+.[a-z]{2,})*(.\w+)*\/*\w*\/*\w*\/*\w*\/*\w+(\/*#?)?\.* /i); // регулярное выражение отсеивающее ссылку в начале текста

export const cardsContainer = document.querySelector('.cards');
export const cardsNodeList = document.querySelectorAll('.cards__cell');
// export const cardsNotDisplayedNodeList = document.querySelectorAll('.cards__cell_dispay-none');
export const preloader = document.querySelector('.preloader');
export const preloaderCircle = document.querySelector('.preloader__circle');
export const preloaderCurrentStatus = document.querySelector('.preloader__current-status');
export const preloaderCurrentError = document.querySelector('.preloader__current-error');
export const searchStatus = document.querySelector('.search-status');
export const searchSection = document.querySelector('.search');
export const input = document.querySelector('.header__search-input');
export const buttonSearch = document.querySelector('.header__search-button');
export const buttonOpenMore = document.querySelector('.search__button-open-more');
export const inputRequirements = document.querySelector('.header__input-requirements');

// Массив для выдачи случайного изображения //пока не понял как локально сгенерить внутри images папку search-results и подтащить туда локальные файлы

export const lostedPicturesReplacement = [
  // './src/images/search-results/0.png',
  // './src/images/search-results/1.png',
  // './src/images/search-results/2.png',
  // './src/images/search-results/3.png',
  // './src/images/search-results/4.png',
  // './src/images/search-results/5.png',
  // './src/images/search-results/6.png',
  // './src/images/search-results/7.png',
  // './src/images/search-results/8.png',
  // './src/images/search-results/9.png',
  // './src/images/search-results/10.png',
  // './src/images/search-results/11.png',
  // './src/images/search-results/12.png',
  // './src/images/search-results/13.png',
  // './src/images/search-results/14.png',
  // './src/images/search-results/15.png',
  // './src/images/search-results/16.png',
  // './src/images/search-results/17.png',
  // './src/images/search-results/18.png',
  // './src/images/search-results/19.png',
  // './src/images/search-results/20.png',
  // './src/images/search-results/21.png',
  // './src/images/search-results/22.png',
  // './src/images/search-results/23.png',
  // './src/images/search-results/24.png',
  // './src/images/search-results/25.png',
  // './src/images/search-results/26.png',
  // './src/images/search-results/27.png',
  // './src/images/search-results/28.png',
  // './src/images/search-results/29.png',
  // './src/images/search-results/30.png'
  'https://i.ibb.co/yRWSSRx/0.png',
  'https://i.ibb.co/S0JyQr0/1.png',
  'https://i.ibb.co/2gf1WYW/2.png',
  'https://i.ibb.co/HpC0xT0/3.png',
  'https://i.ibb.co/6sbJWN3/4.png',
  'https://i.ibb.co/9vtbpnx/5.png',
  'https://i.ibb.co/sHTH044/6.png',
  'https://i.ibb.co/BHkDpRW/7.png',
  'https://i.ibb.co/X7H7Jf3/8.png',
  'https://i.ibb.co/6Y4ZH24/9.png',
  'https://i.ibb.co/Nyc1b3x/10.png',
  'https://i.ibb.co/4pgkdWd/11.png',
  'https://i.ibb.co/f10s1tV/12.png',
  'https://i.ibb.co/YdS9275/13.png',
  'https://i.ibb.co/NYyGhPg/14.png',
  'https://i.ibb.co/nzVbZT9/15.png',
  'https://i.ibb.co/0VH59cz/16.png',
  'https://i.ibb.co/qrPtCM5/17.png',
  'https://i.ibb.co/Zm4WSyp/18.png',
  'https://i.ibb.co/fqqrpVg/19.png',
  'https://i.ibb.co/gmB5ctQ/20.png',
  'https://i.ibb.co/NxT6zDb/21.png',
  'https://i.ibb.co/tMWwTG5/22.png',
  'https://i.ibb.co/JRtVKKn/23.png',
  'https://i.ibb.co/28LqhSx/24.png',
  'https://i.ibb.co/L09dNLq/25.png',
  'https://i.ibb.co/DwnfsNs/26.png',
  'https://i.ibb.co/4srLfnn/27.png',
  'https://i.ibb.co/HGrKJfq/28.png',
  'https://i.ibb.co/nz6vZBP/29.png',
  'https://i.ibb.co/dKTCJsJ/30.png'
];



// страница details.js

export const recivedData = JSON.parse(localStorage.getItem('NewsApiLocalStorage'));
export const recivedDataRequest = localStorage.getItem('NewsApiRequest');
// Регулярное выражение игнорируещее регистр словосочетаний
export const regExpRequest = new RegExp('\\s' + recivedDataRequest +'\\s', 'gi');

export const requestTitleElement = document.querySelector('#request-title');
export const newsAmountElement = document.querySelector('#news-amount');
export const headerMensionsElement = document.querySelector('#header-menshions');
export const currentMonthElement = document.querySelector('.search-analitics__bar-title-cur-month');
export const previousMonthElement = document.querySelector('.search-analitics__bar-title-prev-month');
export const timeNodeList = document.querySelectorAll('time');
export const valueNodeList = document.querySelectorAll('.search-analitics__value');



// страница about.js

export const slidesContainer = document.querySelector('.slider__slides');
export const bulletsContainer = document.querySelector('.slider__bullets');