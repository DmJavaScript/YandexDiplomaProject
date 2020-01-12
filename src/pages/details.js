import "./details.css";
import {recivedData, recivedDataRequest, daily, fromMonth, currentMonth, publishDates, timeNodeList, valueNodeList} from "../js/constants.js";
import {titleRepitsNumber} from "../js/utils.js";

//Рендер темы запроса
document.querySelector('#request-title').textContent = recivedDataRequest.charAt(0).toUpperCase() + recivedDataRequest.slice(1);
document.querySelector('#news-amount').textContent = recivedData.length; // Новостей за неделю
document.querySelector('#header-menshions').textContent = titleRepitsNumber(); // Упоминаний в заголовках

// Вставка текущего месяца в заголовок таблицы
document.querySelector('.search-analitics__bar-title-cur-month').textContent = '(' + currentMonth + ')';

// ПРОВЕРКА СОВПАДЕНИЯ МЕСЯЦЕВ (в недельном промежутке табличной статистики) добавляет в HTML надпись предшествующего месяца при условии, что в выборку попадают два месяца.
if (fromMonth !== currentMonth) {
  document.querySelector('.search-analitics__bar-title-prev-month').textContent = '(' + fromMonth + ')';
}

for (let c = 0; c <publishDates.length; c++) {
  timeNodeList[c].dateTime = publishDates[c];
  timeNodeList[c].textContent = new Date(publishDates[c]).toLocaleDateString('ru-RU', {day: 'numeric'}) + ', ' + new Date(publishDates[c]).toLocaleDateString('ru-RU', {weekday: 'short'});
  valueNodeList[c].textContent = daily[c];
  valueNodeList[c].style.width = daily[c] + '%';
}
