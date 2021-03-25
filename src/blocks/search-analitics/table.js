import {currentDate, sevenDaysAgo, recivedData, regExpRequest, currentMonthElement, previousMonthElement, timeNodeList, valueNodeList} from '../../pages/details.js';

export class Table {
  constructor () {
    this._sevenDaysAgo = sevenDaysAgo;
    this._currentDate = currentDate;
    this._recivedData = recivedData;
    this._regExpRequest = regExpRequest;

    this._currentMonthElement = currentMonthElement;
    this._previousMonthElement = previousMonthElement;
    this._timeNodeList = timeNodeList;
    this._valueNodeList = valueNodeList;

    this._statisticsResults = [];
    this._zeroCalibrationArray = [];
    this._counter = {};
    this._daily = [];
  }

  updateData () {
    this._monthHeadings();
    this._convertStorageData();
    this._prepareRenderObject();
    this._correctionDistortionsAmmount();
    this._render();
  }

  _monthHeadings () {
    // Подготовка названий месяцев для текущей даты и недельной давности месяца
    const fromMonth = this._sevenDaysAgo.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();
    const currentMonth = this._currentDate.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();
    this._currentMonthElement.textContent = '(' + currentMonth + ')'; // Вставка текущего месяца в заголовок таблицы
    /* ПРОВЕРКА СОВПАДЕНИЯ МЕСЯЦЕВ (в недельном промежутке табличной статистики), далее метод
    добавляет в HTML надпись предшествующего месяца при условии, что в выборку попадают два месяца. */
    if (fromMonth !== currentMonth) {
      this._previousMonthElement.textContent = '(' + fromMonth + ')';
    }
  }

  _convertStorageData () {
    this._statisticsResults = this._recivedData.map(function (_results) {
      const dateTime = _results.publishedAt.slice(0, 10);
      const text = _results.title + ' ' + _results.description;
      return [dateTime, [text]];
    }).sort();
    return this._statisticsResults;
  }

  _createDates ()  { //Метод для получения ВЫБОРОЧНО РАНЖИРОВАННОГО массива дат публикаций
    const statisticsUpgradedResults = this._textDataToNumbersInArray(this._statisticsResults);
    const createdDates = [];

    statisticsUpgradedResults.forEach((e, g) => {
      const pubdate = statisticsUpgradedResults[g][0];
      const m = statisticsUpgradedResults[g][1];
      if (m === 1 || m === 0) {
        createdDates.push(pubdate);
      } else {
        const _times=(n,f)=>{while(n-->0)f();}
        _times(m,()=>createdDates.push(pubdate));
      }
    });
    return createdDates;
  }

  _textDataToNumbersInArray () { /* Внутренний метод подсчёта ПОВТОРЕНИЙ КЛЮЧЕВОГО СЛОВА заголовков и превью,
    простановка нулей там где результатов нет и перезапись обновленных данных в исходный массив */
      this._statisticsResults.forEach((e, l) => {
        const matchedMentiones = (this._statisticsResults[l][1]).toString().match(this._regExpRequest);
        if (matchedMentiones !== null) {
          this._statisticsResults[l][1] = this._statisticsResults[l][1].splice(1, 1);
          this._statisticsResults[l][1] = matchedMentiones.length;
        } else {
          this._statisticsResults[l][1] = this._statisticsResults[l][1].splice(1, 1);
          this._statisticsResults[l][1] = 0;
        }
      });
      return this._statisticsResults;
    }

  _createEmptyLastWeekArray () { /* для полноты отображения нулевых дней в строках
    таблицы ввёл корректировочный массив чтобы они не были съедены методом reduce,
    эту разницу компенсирую до передачи в таблицу! */
    const startDate = sevenDaysAgo.toJSON().slice(0,10);
    const todayCD = currentDate.toJSON().slice(0,10);
    const dateMove = new Date(startDate);
    let oldDate = startDate;
    while (oldDate < todayCD){
      oldDate = dateMove.toISOString().slice(0,10);
      this._zeroCalibrationArray.push(oldDate);
      dateMove.setDate(dateMove.getDate()+1);
    }
    return this._zeroCalibrationArray;
  }

  _prepareRenderObject () {// сортирую Объект для столбиков с одной лишней публикацией за каждый день
    const datesPerMentions = this._createDates();
    const plusExtraDay = datesPerMentions.concat(this._createEmptyLastWeekArray());
    this._counter = plusExtraDay.sort().reduce((accum, item) => {
      accum[item] = (accum[item] || 0) + 1 ;
      return accum;
    }, {})
    return this._counter;
  }

  _correctionDistortionsAmmount () {
    this._daily = Object.values(this._counter); // количество превышающее реальность на одну публикацию в день
    this._daily.forEach((e, c) => this._daily[c] -= 1); //корректирую все данные до реальных значений
    return this._daily;
  }

  _render() {
   const publishDates = Object.keys(this._counter); // готовые даты
   publishDates.forEach((e, c) => {
      this._timeNodeList[c].dateTime = publishDates[c];
      this._timeNodeList[c].textContent = new Date(publishDates[c]).toLocaleDateString('ru-RU', {day: 'numeric'}) + ', ' + new Date(publishDates[c]).toLocaleDateString('ru-RU', {weekday: 'short'});
      this._valueNodeList[c].textContent = this._daily[c];
      this._valueNodeList[c].style.width = this._daily[c] + '%';
    });
  }
}

export const table = new Table ();