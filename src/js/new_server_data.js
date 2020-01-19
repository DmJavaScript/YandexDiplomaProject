import {buttonSearch, input} from '../js/constants.js';
import {storageData, newsApi} from '../pages/index.js';

export class NewServerData {
  constructor () {
    this._preloader = document.querySelector('.preloader');
    this._preloaderCircle = document.querySelector('.preloader__circle');
    this._preloaderCurrentStatus = document.querySelector('.preloader__current-status');
    this._preloaderCurrentError = document.querySelector('.preloader__current-error');
    this._searchStatus = document.querySelector('.search-status');
    this._searchSection = document.querySelector('.search');
    this._input = input;
    this._newsApi = newsApi;
    this._storageData = storageData;
    this._buttonSearch = buttonSearch;

    this._buttonSearch.addEventListener('click', this._getData.bind(this));
  }

  _cardsFromServer (serverData) {// Метод получения массива новостей с сервера
    localStorage.clear ();
    this._disablePreloader ();

    // КОГДА НИЧЕГО НЕ НАЙДЕНО
    if (serverData.length === 0) {
      this._openSearchStatus (); // показываю секцию ненайденных результатов
      this._closeResultsSection ();
    }
    // КОГДА НАЙДЕНЫ РЕЗУЛЬТАТЫ
    if (serverData.length !== 0) {
      const _serialObj = JSON.stringify(serverData);
      localStorage.setItem('NewsApiLocalStorage', _serialObj);
      localStorage.setItem('NewsApiRequest', this._input.value);
      this._closeSearchStatus ();
      this._storageData.chekingStorage ();
    }
  }

  _enablePreloader () {
    this._preloader.classList.remove('preloader_display-none');
    this._preloaderCircle.classList.remove('preloader__circle_display-none');
    this._preloaderCurrentStatus.classList.remove('preloader__current-status_display-none');
    this._preloaderCurrentError.classList.add('preloader__current-error_display-none');
  }

  _disablePreloader () {
    this._preloader.classList.add('preloader_display-none');
  }

  _disableForm () {
    this._buttonSearch.setAttribute('disabled', true);
    this._input.setAttribute('disabled', true);
  }

  _enableForm () {
    this._buttonSearch.removeAttribute('disabled');
    this._input.removeAttribute('disabled');
  }

  _lostConnection (err) {
    this._preloader.classList.remove('preloader_display-none');
    this._preloaderCircle.classList.add('preloader__circle_display-none');
    this._preloaderCurrentStatus.classList.add('preloader__current-status_display-none');
    this._preloaderCurrentError.classList.remove('preloader__current-error_display-none');
    console.log('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.', err);
  }

  _closeSearchStatus () {// метод скрытия секции с уведомлением о ненайденных результатах
    if (!this._searchStatus.classList.contains('search-status_display-none')) {
      this._searchStatus.classList.add('search-status_display-none');
    }
  }

  _openSearchStatus ()  {
    this._searchStatus.classList.remove('search-status_display-none');
  }

  _openResultsSection ()  {
    this._searchSection.classList.remove('search_display-none'); // открыть секцию с результатами поиска
  }

  _closeResultsSection () {// метод скрытия секции с результатами поиска
    if (!this._searchSection.classList.contains('search_display-none')) {
      this._searchSection.classList.add('search_display-none');
    }
  }

  _getData (event) { //Метод отправки поискового запроса после нажатия кнопки
    event.preventDefault();
    this._disableForm();
    this._enablePreloader();
    this._closeSearchStatus();
    this._closeResultsSection();

    this._newsApi.getNews(this._input.value)
                .then((data) => this._cardsFromServer (data.articles))
                .catch((err) => this._lostConnection (err))
                .finally(this._enableForm.bind(this));
  }

}