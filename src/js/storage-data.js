import {regExpHTTPLinkFirst, searchSection, cardsList, input} from '../pages/index.js';
import {formatDate} from './utils.js';

export class StorageData {
  constructor () {
    this._searchSection = searchSection;
    this._cardsList = cardsList;
    this._input = input;
  }

  chekingStorage () { // Метод получения массива новостей с локального хранилища
    const recivedData = JSON.parse(localStorage.getItem('NewsApiLocalStorage'));
    const recivedDataRequest = localStorage.getItem('NewsApiRequest');
    if (recivedDataRequest !== null && recivedData !== null) {
      this._input.value = recivedDataRequest;
      let resultsArray = [];
      resultsArray = recivedData.map(this._preparePackageArray).sort().reverse();
      this._initializeRender(resultsArray);
      this._openResultsSection ();
      return resultsArray;
    }
  }

  _preparePackageArray (eventData) {
    const descriptionTextPreview = eventData.description.replace(regExpHTTPLinkFirst, '');
    const cardDate = formatDate(eventData.publishedAt);
    const dateTime = eventData.publishedAt;
    return [dateTime, eventData.url, eventData.urlToImage, cardDate, eventData.title, descriptionTextPreview, eventData.source.name];
  }

  _initializeRender (resultsArray) {
    this._cardsList.startMount(resultsArray);
  }

  _openResultsSection ()  {
    this._searchSection.classList.remove('search_display-none'); // открыть секцию с результатами поиска
  }
}
