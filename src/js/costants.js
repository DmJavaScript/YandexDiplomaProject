//страница details.js
import {createEmptyLastWeekArray, textDataToNumbersInArray, createDates} from "./utils.js";

//Достаю сохранёный ранее ответ сервера из локального хранилища
export const recivedData = JSON.parse(localStorage.getItem("NewsApiLocalStorage"));
//Тема запроса, сохранённого в локальном хранилище
export const recivedDataRequest = localStorage.getItem("NewsApiRequest");
export const regExpRequest = new RegExp('\\s' + recivedDataRequest +'\\s', 'gi');
// регулярное выражение игнорируещее регистр словосочетаний

export const statistics = document.querySelectorAll('.header__week-number');

//ВЫБОР ДАТЫ и ПОВТОРЕНИЙ для таблицы
export const detailsPageData = recivedData.map(function (detailsPageData) {
  const dateTime = detailsPageData.publishedAt.slice(0, 10);
  const text = detailsPageData.title + ' ' + detailsPageData.description;
  return [dateTime, [text]];
}).sort();

export const detailsPageDataNew = textDataToNumbersInArray (detailsPageData);

export const datesPerMentions = createDates ();

export const cd = (new Date);
export const gapSixDaysInMS = cd - Date.UTC(cd.getFullYear(), cd.getMonth(), cd.getDate()-6);
export const dateWithoutUTC = new Date(Date.now() - gapSixDaysInMS); // вычитаем количество милисекунд за интересуемый промежуток времени
export const date = new Date(dateWithoutUTC);

/*для полноты отображения нулевых дней в строках
таблицы ввёл корректировочный массив чтобы они
не были съедены методом reduce, эту разницу
компенсирую до передачи в таблицу! */
export let zeroCalibrationArray = [];
export const plusExtraDay = datesPerMentions.concat(createEmptyLastWeekArray());


// сортирую Объект для столбиков с одной лишней публикацией за каждый день
export const counter = plusExtraDay.sort().reduce((accum, item) => {
  accum[item] = (accum[item] || 0) + 1 ;
  return accum;
}, {})

// количество превышающее реальность на одну публикацию в день
export const daily = Object.values(counter);

// Подготовка названий месяцев для текущей даты и недельной давности месяца
export const fromMonth = date.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();
export const currentMonth = cd.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();

// заброс данных в HTML-разметку
export const publishDates = Object.keys(counter);