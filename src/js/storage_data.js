import {regExpHTTPLinkFirst, cardsList, input} from '../pages/index.js';
import {formatDate} from '../js/utils.js';

export class StorageData {
  constructor () {
    this._searchSection = document.querySelector('.search');
    this._input = input;
  }

  chekingStorage () {// Метод получения массива новостей с локального хранилища
    const _recivedData = JSON.parse(localStorage.getItem('NewsApiLocalStorage'));
    const _recivedDataRequest = localStorage.getItem('NewsApiRequest');
    if (_recivedDataRequest !== null && _recivedData !== null) {
      this._input.value = _recivedDataRequest;
      let resultsArray = [];
      resultsArray = Array.from(_recivedData).map(this._preparePackageArray).sort().reverse();
      this._initializeRender(resultsArray);
      this._openResultsSection ();
      return resultsArray;
    }
  }

  _preparePackageArray (resultsArray) {
    const _descriptionTextPreview = resultsArray.description; //.replace(regExpHTTPLinkFirst, ''); //временно отложил решение(необязательная для диплома функция)
    const _cardDate = formatDate(resultsArray.publishedAt);
    const _dateTime = resultsArray.publishedAt;
    return [_dateTime, resultsArray.url, resultsArray.urlToImage, _cardDate, resultsArray.title, _descriptionTextPreview, resultsArray.source.name];
  }

  _initializeRender (resultsArray) {
    cardsList.startMount(resultsArray);
  }

  _openResultsSection ()  {
    this._searchSection.classList.remove('search_display-none'); // открыть секцию с результатами поиска
  }
}
