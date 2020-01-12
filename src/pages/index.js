import "./index.css";
import {Validation} from '../js/validation.js';
import {NewsApi} from '../js/news_api.js';
// import {CardsList} from '../js/cards_list.js';
import {Card} from '../js/card.js';



// import {formatDate, getRandomInt} from '../js/utils.js';
import {input, buttonSearch, lostedPicturesReplacement, cardArguments} from '../js/constants.js';
// import {Card} from '../js/card.js';
const newsApi = new NewsApi();

new Validation();

let inputRequest = '';






buttonSearch.addEventListener('click', receiveInput);
// Функция отправки поискового запроса после нажатия кнопки
function receiveInput (event) {
  event.preventDefault();
  preloaderOn();
  closeSearchStatus();
  inputRequest = input.value;
  newsApi.getNews(inputRequest)
                          .then((data) => cardsFromServer (data.articles))
                          .catch(function (err) {
                            console.log('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.', err);
                            lostConnection();
                            return Promise.reject(`Ошибка: ${err}`); //дополнительно прочитать правильно ли я сделал
                          });
}

const preloader = document.querySelector('.preloader');
const preloaderCircle = document.querySelector('.preloader__circle');
const preloaderCurrentStatus = document.querySelector('.preloader__current-status');
const preloaderCurrentError = document.querySelector('.preloader__current-error');

function lostConnection() {
  preloader.classList.remove('preloader_display-none');
  preloaderCircle.classList.add('preloader__circle_display-none');
  preloaderCurrentStatus.classList.add('preloader__current-status_display-none');
  preloaderCurrentError.classList.remove('preloader__current-error_display-none');
}

function preloaderOn() {
  preloader.classList.remove('preloader_display-none');
  preloaderCircle.classList.remove('preloader__circle_display-none');
  preloaderCurrentStatus.classList.remove('preloader__current-status_display-none');
  preloaderCurrentError.classList.add('preloader__current-error_display-none');
}

let resultsArray = [];
const searchSection = document.querySelector('.search');

// Функция получения массива новостей с локального хранилища
// chekingStorage ();
// function chekingStorage () {
//   const inputRequest = localStorage.getItem("NewsApiRequest");
//   const results = JSON.parse(localStorage.getItem("NewsApiLocalStorage"));
//   if( inputRequest !== undefined && results !== undefined) {
//     input.value = inputRequest;
//     searchSection.classList.remove('search_display-none');
//     resultsArray = Array.from(results).map(mainPackage).sort().reverse();
//     cardsList.render(resultsArray); //неправильно
//     console.log(resultsArray);
//     return resultsArray;
//   }
// }

const regExpHTTPLinkFirst = new RegExp(/(https|http)?:\/\/(www.)?[^-_.\s](\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})?(:\d+)?(\w+.[a-z]{2,})*(.\w+)*\/*\w*\/*\w*\/*\w*\/*\w+(\/*#?)? /i); // регулярное выражение отсеивающее ссылку в начале текста

//перевожу объект, получанный в результате fetch-запроса от сервера, в искомый массив
function mainPackage (resultsArray) {
  const descriptionTextPreview = resultsArray.description.replace(regExpHTTPLinkFirst, ' ');
  const cardDate = formatDate(resultsArray.publishedAt);
  const dateTime = resultsArray.publishedAt;
  return [dateTime, resultsArray.url, resultsArray.urlToImage, cardDate, resultsArray.title, descriptionTextPreview, resultsArray.source.name];
}



const searchStatus = document.querySelector('.search-status');

// Функция получения массива новостей с сервера

function cardsFromServer (serverData) {
  localStorage.clear ();
  localStorage.setItem("NewsApiRequest", inputRequest);

  // КОГДА НИЧЕГО НЕ НАЙДЕНО
  if (serverData.length === 0) {
    preloader.classList.add('preloader_display-none');
    searchStatus.classList.remove('search-status_display-none'); // показываю секцию ненайденных результатов
    closeResultsSection();
  }
  // КОГДА НАЙДЕНЫ РЕЗУЛЬТАТЫ
  if (serverData.length !== 0) {
    // Сохраняю полученный ответ в локальное хранилище
    const serialObj = JSON.stringify(serverData);
    localStorage.setItem("NewsApiLocalStorage", serialObj);
    // Запрос данных из локального хранилища ПОЛНЫЙ несортированный массив
    const results = JSON.parse(localStorage.getItem("NewsApiLocalStorage"));
    //ВЫБОРОЧНО РАНЖИРОВАННЫЙ массив, сортировываю значения по первому ключу dateTime (исходный resultsArray.publishedAt)
    resultsArray = Array.from(results).map(mainPackage).sort().reverse();

    preloader.classList.add('preloader_display-none');
    renderAndOpenResultsSection();
    console.log(resultsArray);
    return resultsArray;
  }
}

function closeResultsSection() {
  if (!searchSection.classList.contains('search_display-none')) {
    searchSection.classList.add('search_display-none');
  }
}// скрываю секцию с результатами поиска


function renderAndOpenResultsSection() {
  const cardsList = new CardsList(cardArguments);
  cardsList.startMount();
  searchSection.classList.remove('search_display-none'); // открывать секцию с результатами поиска
  closeSearchStatus();
}

function closeSearchStatus() {
  if (!searchStatus.classList.contains('search-status_display-none')) {
    searchStatus.classList.add('search-status_display-none');
  }
}// скрываю секцию с уведомлением о ненайденных результатах




export class CardsList {
  constructor(cardArguments) {
    this._cardsContainer = document.querySelector('.cards');
    this._cards = document.querySelectorAll('.cards__cell');
    this._cardArguments = cardArguments;
    this._fromCardPosition = 0;
    this._openPerOnce = 3;
    this._buttonOpenMore = document.querySelector('.search__button-open-more');
    this._openMoreCards = this._openMoreCards.bind(this);

    this._buttonOpenMore.addEventListener('click', this._openMoreCards);
  }

  startMount() {
    this._deleteOldCards();
    this._render();
    this._openMoreCards();
  }

  _deleteOldCards() { //метод удаления старых карточек на странице
    this._cards.forEach((element) => this._cardsContainer.removeChild(element));
  }

  _addCard(...args) { //метод для добавления карточки в список карточек
    const _card = this._cardArguments(...args);
    this._cardsContainer.appendChild(_card.createCard());
  }

  _render() { //метод для автоматической отрисовки карточек из списка addCard
    resultsArray.forEach((resultsArray) => this._addCard(resultsArray[0], resultsArray[1], resultsArray[2], resultsArray[3], resultsArray[4], resultsArray[5], resultsArray[6]));
  }

  _openMoreCards() {
    this._buttonOpenMore.classList.remove('search__button-open-more_display-none');
    const _cardsNotDisplayed = Array.from(document.querySelectorAll('.cards__cell_dispay-none')); //тут список карточек меняется поэтому при каждом вызове функции нужен новый список - обновление списка элементов.
    _cardsNotDisplayed.slice(this._fromCardPosition, this._openPerOnce).forEach((_cardsNotDisplayed) => _cardsNotDisplayed.classList.remove('cards__cell_dispay-none'));
    if (_cardsNotDisplayed.length < this._openPerOnce) {
      this._buttonOpenMore.classList.add('search__button-open-more_display-none');
      this._buttonOpenMore.removeEventListener('click', this._openMoreCards);
    }
  }
}

// const cardsList = new CardsList(resultsArray);
// cardsList.startMount();
const cardsList = new CardsList(cardArguments);
// cardsList.startMount();




// class NewServerData {
//   constructor () {
//     this._preloader = document.querySelector('.preloader');
//     this._preloaderCircle = document.querySelector('.preloader__circle');
//     this._preloaderCurrentStatus = document.querySelector('.preloader__current-status');
//     this._preloaderCurrentError = document.querySelector('.preloader__current-error');
//     this._searchStatus = document.querySelector('.search-status');
//     this._searchSection = document.querySelector('.search');
//     this._regExpHTTPLinkFirst = regExpHTTPLinkFirst;
//     this._resultsArray = resultsArray;
//     this._button = buttonSearch;
//     this._input = input;
//     this._newsApi = newsApi;

//     this._button.addEventListener('click', this.getData.bind(this));
//   }

//   _cardsFromServer (serverData) {// Метод получения массива новостей с сервера
//     localStorage.clear ();
//     localStorage.setItem("NewsApiRequest", inputRequest);

//     // КОГДА НИЧЕГО НЕ НАЙДЕНО
//     if (serverData.length === 0) {
//       _disablePreloader();
//       _openSearchStatus ();// показываю секцию ненайденных результатов
//       _closeResultsSection();
//     }
//     // КОГДА НАЙДЕНЫ РЕЗУЛЬТАТЫ
//     if (serverData.length !== 0) {
//       // Сохраняю полученный ответ в локальное хранилище
//       const serialObj = JSON.stringify(serverData);
//       localStorage.setItem("NewsApiLocalStorage", serialObj);
//       // Запрос данных из локального хранилища ПОЛНЫЙ несортированный массив
//       const results = JSON.parse(localStorage.getItem("NewsApiLocalStorage"));
//       console.log(this._resultsArray);
//       //ВЫБОРОЧНО РАНЖИРОВАННЫЙ массив, сортировываю значения по первому ключу dateTime (исходный resultsArray.publishedAt)
//       this._resultsArray = Array.from(results).map(this._preparePackageArray (this._resultsArray)).sort().reverse();

//       this._disablePreloader();
//       this._initializeRender();
//       this._closeSearchStatus();
//       this._openResultsSection();
//       console.log(this._resultsArray);
//       return this._resultsArray;
//     }
//   }

//   _enablePreloader () {
//     this._preloader.classList.remove('preloader_display-none');
//     this._preloaderCircle.classList.remove('preloader__circle_display-none');
//     this._preloaderCurrentStatus.classList.remove('preloader__current-status_display-none');
//     this._preloaderCurrentError.classList.add('preloader__current-error_display-none');
//   }

//   _disablePreloader () {
//     this.preloader.classList.add('preloader_display-none');
//   }

//   _disableForm () {
//     this._button.setAttribute('disabled', true);
//     this._input.setAttribute('disabled', true);
//   }

//   _enableForm () {
//     this._button.removeAttribute('disabled');
//     this._input.removeAttribute('disabled');
//   }

//   _lostConnection () {
//     this._preloader.classList.remove('preloader_display-none');
//     this._preloaderCircle.classList.add('preloader__circle_display-none');
//     this._preloaderCurrentStatus.classList.add('preloader__current-status_display-none');
//     this._preloaderCurrentError.classList.remove('preloader__current-error_display-none');
//   }

//   _closeSearchStatus () {// метод скрытия секции с уведомлением о ненайденных результатах
//     if (!this._searchStatus.classList.contains('search-status_display-none')) {
//       this._searchStatus.classList.add('search-status_display-none');
//     }
//   }

//   _openSearchStatus ()  {
//     this._searchStatus.classList.remove('search-status_display-none');
//   }

//   openResultsSection ()  {
//     this._searchSection.classList.remove('search_display-none'); // открыть секцию с результатами поиска
//   }

//   _closeResultsSection () {// метод скрытия секции с результатами поиска
//     if (!this._searchSection.classList.contains('search_display-none')) {
//       this._searchSection.classList.add('search_display-none');
//     }
//   }

//   getData (event) { //Метод отправки поискового запроса после нажатия кнопки
//     event.preventDefault(); // заместо попробовать this._button.remove();
//     this._disableForm();
//     this._enablePreloader();
//     this._closeSearchStatus();

//     inputRequest = this._input.value;

//     this._newsApi.getNews(inputRequest)
//                 .then((data) => this._cardsFromServer (data.articles))
//                 .catch(function (err) {
//                   // this._lostConnection();
//                   console.log('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.', err);
//                   return Promise.reject(`Ошибка: ${err}`); //дополнительно прочитать правильно ли я сделал
//                 })
//                 .finally(this._enableForm.bind(this));
//   }
// }

// const displayResults = new NewServerData();



export class StorageData {
  constructor (resultsArray) {
    this.resultsArray = resultsArray;
    this._cardsList = cardsList;
    this._displayResults = displayResults;
  }

  startMount () {
    this._chekingStorage();
    this._initializeRender();
    this._displayResults.openResultsSection();
  }

  _chekingStorage () {// Метод получения массива новостей с локального хранилища
    const inputRequest = localStorage.getItem("NewsApiRequest");
    const results = JSON.parse(localStorage.getItem("NewsApiLocalStorage"));
    if( inputRequest !== undefined && results !== undefined) {
      input.value = inputRequest;
      resultsArray = Array.from(results).map(this._preparePackageArray).sort().reverse();
      return resultsArray;
    } else {
      this._displayResults.getData();
    }
  }

  _preparePackageArray (results) {
    const _descriptionTextPreview = results.description.replace(regExpHTTPLinkFirst, ' ');
    const _cardDate = formatDate(results.publishedAt);
    const _dateTime = results.publishedAt;
    return [_dateTime, results.url, results.urlToImage, _cardDate, results.title, _descriptionTextPreview, results.source.name];
  }

  _initializeRender () {
    this._cardsList.startMount();
  }
}


const loadStorageCards = new StorageData();
loadStorageCards.startMount();
console.log(resultsArray);
