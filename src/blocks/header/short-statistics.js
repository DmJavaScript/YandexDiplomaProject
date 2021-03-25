import {recivedData, recivedDataRequest, regExpRequest, requestTitleElement, newsAmountElement, headerMensionsElement} from '../../pages/details.js';

export class ShortStatistics {
  constructor () {
    this._requestTitleElement = requestTitleElement;
    this._newsAmountElement = newsAmountElement;
    this._headerMensionsElement = headerMensionsElement;

    this._recivedDataRequest = recivedDataRequest;
    this._recivedData = recivedData;
    this._localStorage = localStorage;
    this._regExpRequest = regExpRequest;
  }

  render () {
    this._requestTitleElement.textContent = this._recivedDataRequest.charAt(0).toUpperCase() + this._recivedDataRequest.slice(1);
    this._newsAmountElement.textContent = this._recivedData.length; // Новостей за неделю
    this._headerMensionsElement.textContent = this._titleRepitsNumber(); // Упоминаний в заголовках
   }

  _titleRepitsNumber () { //Метод сужения всех заголовков до строки и подсчёта количества совпадений
    const titlesArray = JSON.parse(this._localStorage.getItem('NewsApiLocalStorage'));
    titlesArray.map(storageString => [storageString.title]);
    return JSON.stringify(titlesArray).match(this._regExpRequest).length;
  }

}

export const shortStatistics = new ShortStatistics (localStorage);