import {Card} from './card.js';

export const currentDate = (new Date);
const fullDaysPassed = 6;
const gapSixDaysInMS = currentDate - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - fullDaysPassed);
const dateWithoutUTC = new Date(Date.now() - gapSixDaysInMS); // вычитаем количество милисекунд за интересуемый промежуток времени
export const sevenDaysAgo = new Date(dateWithoutUTC);

//страница index.js
export const input = document.querySelector('.header__search-input');
export const buttonSearch = document.querySelector('.header__search-button');

export const cardArguments = (...args) => new Card (...args);


// Массив для выдачи случайного изображения

export const lostedPicturesReplacement = [
  'https://i.ibb.co/S0JyQr0/1.png',
  'https://i.ibb.co/2gf1WYW/2.png',
  'https://i.ibb.co/HpC0xT0/3.png',
  'https://i.ibb.co/sHTH044/6.png',
  'https://i.ibb.co/BHkDpRW/7.png',
  'https://i.ibb.co/X7H7Jf3/8.png',
  'https://i.ibb.co/6Y4ZH24/9.png',
  'https://i.ibb.co/f10s1tV/12.png',
  'https://i.ibb.co/YdS9275/13.png',
  'https://i.ibb.co/NYyGhPg/14.png',
  'https://i.ibb.co/nzVbZT9/15.png',
  'https://i.ibb.co/qrPtCM5/17.png',
  'https://i.ibb.co/Zm4WSyp/18.png',
  'https://i.ibb.co/fqqrpVg/19.png',
  'https://i.ibb.co/gmB5ctQ/20.png',
  'https://i.ibb.co/NxT6zDb/21.png',
  'https://i.ibb.co/tMWwTG5/22.png',
  'https://i.ibb.co/L09dNLq/25.png',
  'https://i.ibb.co/DwnfsNs/26.png',
  'https://i.ibb.co/HGrKJfq/28.png',
  'https://i.ibb.co/dKTCJsJ/30.png'
];





//страница details.js
import {createEmptyLastWeekArray, textDataToNumbersInArray, createDates} from "./utils.js";

export const timeNodeList = document.querySelectorAll('time');
export const valueNodeList = document.querySelectorAll('.search-analitics__value');

//Достаю сохранёный ранее ответ сервера из локального хранилища
export const recivedData = JSON.parse(localStorage.getItem("NewsApiLocalStorage"));
//Тема запроса, сохранённого в локальном хранилище
export const recivedDataRequest = localStorage.getItem("NewsApiRequest");
export const regExpRequest = new RegExp('\\s' + recivedDataRequest +'\\s', 'gi');
// регулярное выражение игнорируещее регистр словосочетаний

//ВЫБОР ДАТЫ и ПОВТОРЕНИЙ для таблицы
export const statisticsResults = recivedData.map(function (statisticsResults) {
  const dateTime = statisticsResults.publishedAt.slice(0, 10);
  const text = statisticsResults.title + ' ' + statisticsResults.description;
  return [dateTime, [text]];
}).sort();

export const statisticsUpgradedResults = textDataToNumbersInArray (statisticsResults);

export const datesPerMentions = createDates ();

/*для полноты отображения нулевых дней в строках
таблицы ввёл корректировочный массив чтобы они
не были съедены методом reduce, эту разницу
компенсирую до передачи в таблицу! */
export const zeroCalibrationArray = [];
export const plusExtraDay = datesPerMentions.concat(createEmptyLastWeekArray());


// сортирую Объект для столбиков с одной лишней публикацией за каждый день
export const counter = plusExtraDay.sort().reduce((accum, item) => {
  accum[item] = (accum[item] || 0) + 1 ;
  return accum;
}, {})

// количество превышающее реальность на одну публикацию в день
export const daily = Object.values(counter);

// Подготовка названий месяцев для текущей даты и недельной давности месяца
export const fromMonth = sevenDaysAgo.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();
export const currentMonth = currentDate.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();

// заброс данных в HTML-разметку
export const publishDates = Object.keys(counter);