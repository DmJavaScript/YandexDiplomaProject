import {recivedData, recivedDataRequest, regExpRequest} from '../../pages/details.js';

export class ShortStatistics {
  constructor () {
    this._recivedDataRequest = recivedDataRequest;
    this._recivedData = recivedData;
    this._regExpRequest = regExpRequest;
    this._localStorage = localStorage;
  }

  render () {
    document.querySelector('#request-title').textContent = this._recivedDataRequest.charAt(0).toUpperCase() + this._recivedDataRequest.slice(1);
    document.querySelector('#news-amount').textContent = this._recivedData.length; // Новостей за неделю
    document.querySelector('#header-menshions').textContent = this._titleRepitsNumber(); // Упоминаний в заголовках
   }

  _titleRepitsNumber () { //Метод сужения всех заголовков до строки и подсчёта количества совпадений
    const _titlesArray = JSON.parse(this._localStorage.getItem('NewsApiLocalStorage'));
    _titlesArray.map(_storageString => [_storageString.title]);
    return JSON.stringify(_titlesArray).match(regExpRequest).length;
  }

}

export const shortStatistics = new ShortStatistics ();