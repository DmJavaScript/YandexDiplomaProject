import {currentDate, sevenDaysAgo, recivedData, regExpRequest} from '../../pages/details.js';

export class Table {
  constructor () {
    this._timeNodeList = document.querySelectorAll('time');
    this._valueNodeList = document.querySelectorAll('.search-analitics__value');
    this._sevenDaysAgo = sevenDaysAgo;
    this._currentDate = currentDate;
    this._recivedData = recivedData;
    this._regExpRequest = regExpRequest;
    this._statisticsResults = [];
    this._createdDates = [];
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
    const _fromMonth = this._sevenDaysAgo.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();
    const _currentMonth = this._currentDate.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();
    document.querySelector('.search-analitics__bar-title-cur-month').textContent = '(' + _currentMonth + ')'; // Вставка текущего месяца в заголовок таблицы
    /* ПРОВЕРКА СОВПАДЕНИЯ МЕСЯЦЕВ (в недельном промежутке табличной статистики), далее метод
    добавляет в HTML надпись предшествующего месяца при условии, что в выборку попадают два месяца. */
    if (_fromMonth !== _currentMonth) {
      document.querySelector('.search-analitics__bar-title-prev-month').textContent = '(' + _fromMonth + ')';
    }
  }

  _convertStorageData () {
      this._statisticsResults = this._recivedData.map(function (_results) {
      const _dateTime = _results.publishedAt.slice(0, 10);
      const _text = _results.title + ' ' + _results.description;
      return [_dateTime, [_text]];
    }).sort();
    return this._statisticsResults;
  }

  _createDates ()  { //Метод для получения ВЫБОРОЧНО РАНЖИРОВАННОГО массива дат публикаций
    const _statisticsUpgradedResults = this._textDataToNumbersInArray(this._statisticsResults);

    _statisticsUpgradedResults.forEach((e, g) => {
      const _pubdate = _statisticsUpgradedResults[g][0];
      const _m = _statisticsUpgradedResults[g][1];
      if (_m === 1 || _m === 0) {
        this._createdDates.push(_pubdate);
      } else {
        const _times=(n,f)=>{while(n-->0)f();}
        _times(_m,()=>this._createdDates.push(_pubdate));
      }
    });
    return this._createdDates;
  }

  _textDataToNumbersInArray () { /* Внутренний метод подсчёта ПОВТОРЕНИЙ КЛЮЧЕВОГО СЛОВА заголовков и превью,
    простановка нулей там где результатов нет и перезапись обновленных данных в исходный массив */
      this._statisticsResults.forEach((e, l) => {
        const _matchedMentiones = (this._statisticsResults[l][1]).toString().match(this._regExpRequest);
        if (_matchedMentiones !== null) {
          this._statisticsResults[l][1] = this._statisticsResults[l][1].splice(1, 1);
          this._statisticsResults[l][1] = _matchedMentiones.length;
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
    const _startDate = sevenDaysAgo.toJSON().slice(0,10);
    const _todayCD = currentDate.toJSON().slice(0,10);
    const _dateMove = new Date(_startDate);
    let _oldDate = _startDate;
    while (_oldDate < _todayCD){
      _oldDate = _dateMove.toISOString().slice(0,10);
      this._zeroCalibrationArray.push(_oldDate);
      _dateMove.setDate(_dateMove.getDate()+1);
    }
    return this._zeroCalibrationArray;
  }

  _prepareRenderObject () {// сортирую Объект для столбиков с одной лишней публикацией за каждый день
    const _datesPerMentions = this._createDates();
    const _plusExtraDay = _datesPerMentions.concat(this._createEmptyLastWeekArray());
    this._counter = _plusExtraDay.sort().reduce((accum, item) => {
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
   const _publishDates = Object.keys(this._counter); // готовые даты
   _publishDates.forEach((e, c) => {
      this._timeNodeList[c].dateTime = _publishDates[c];
      this._timeNodeList[c].textContent = new Date(_publishDates[c]).toLocaleDateString('ru-RU', {day: 'numeric'}) + ', ' + new Date(_publishDates[c]).toLocaleDateString('ru-RU', {weekday: 'short'});
      this._valueNodeList[c].textContent = this._daily[c];
      this._valueNodeList[c].style.width = this._daily[c] + '%';
    });
  }

}