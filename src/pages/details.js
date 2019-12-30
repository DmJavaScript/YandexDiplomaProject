import "./details.css";
import {recivedData, recivedDataRequest, regExpRequest, statistics, detailsPageDataNew, createdDates, datesPerMentions, createdDatesComplite, plusExtraDay, counter, daily, fromMonth, currentMonth, publishDates, zeroCalibrationArray} from "../js/costants.js";
import {titleRepitsNumber, createDates, createEmptyLastWeekArray, correctionDistortionsAmmount} from "../js/utils.js";

//Рендер темы запроса
document.querySelector('.header__request-input').textContent = recivedDataRequest.charAt(0).toUpperCase() + recivedDataRequest.slice(1);
statistics[0].textContent = recivedData.length; // Новостей за неделю
statistics[1].textContent = titleRepitsNumber(); // Упоминаний в заголовках

// Вставка текущего месяца в заголовок таблицы
document.querySelector('.search-analitics__bar-title-cur-month').textContent = '(' + currentMonth + ')';

// ПРОВЕРКА СОВПАДЕНИЯ МЕСЯЦЕВ (в недельном промежутке табличной статистики) добавляет в HTML надпись предшествующего месяца при условии, что в выборку попадают два месяца.
if (fromMonth !== currentMonth) {
  document.querySelector('.search-analitics__bar-title-prev-month').textContent = '(' + fromMonth + ')';
}

for (let c = 0; c <publishDates.length; c++) {
  document.querySelectorAll('time')[c].dateTime = publishDates[c];
  document.querySelectorAll('time')[c].textContent = new Date(publishDates[c]).toLocaleDateString('ru-RU', {day: 'numeric'}) + ', ' + new Date(publishDates[c]).toLocaleDateString('ru-RU', {weekday: 'short'});
  document.querySelectorAll('.search-analitics__value')[c].textContent = daily[c];
  document.querySelectorAll('.search-analitics__value')[c].style.width = daily[c] + '%';
}
