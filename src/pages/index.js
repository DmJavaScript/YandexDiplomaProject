import "./index.css";

// Универсальные переменные дающие точку отсчёта для даты

const cd = (new Date);
const gapSixDaysInMS = cd - Date.UTC(cd.getFullYear(), cd.getMonth(), cd.getDate()-6);
const dateWithoutUTC = new Date(Date.now() - gapSixDaysInMS); // вычитаем количество милисекунд за интересуемый промежуток времени
const date = new Date(dateWithoutUTC);

// Подготовка формата даты к fetch запросу
const fromDate = 'from=' + date.toJSON(); //.slice(0, 10);
const currentDate = 'to=' + cd.toJSON(); //.slice(0, 10);


class Api {
  getNews (inputRequest) {
    return fetch('https://newsapi.org/v2/everything?q=' + `${inputRequest}` + '&pageSize=100&language=ru&' + `${fromDate}` + '&' + `${currentDate}`+ '&apiKey=a77a12e2e4484b4fb5cc12d192f94b00', {
      method: 'GET'
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    })
  }
}

const api = new Api();



//Валидация
const input = document.getElementById('search-input');
input.addEventListener('input', finalFieldCheck);

function finalFieldCheck (event){
  buttonSearch.classList.remove('header__search-button_invalid');
  validate ();
}

function validate() {
  if (!input.checkValidity()) {
    customValidationMessages();
    document.querySelector('.header__input-requirements').textContent = input.validationMessage;
    buttonSearch.classList.add('header__search-button_invalid');
    buttonSearch.disabled = true;
  } else {
    buttonSearch.disabled = false;
    document.querySelector('.header__input-requirements').textContent = '';
  }
}

function customValidationMessages() {
  if (input.validity.valueMissing) {
    input.setCustomValidity("Нужно ввести ключевое слово");
  }
  if (input.value.length > 1 ) {
    input.setCustomValidity('');
  }
}

//Кнопка поиска
const formSearch = document.forms.search;
let inputRequest = '';
const buttonSearch = document.querySelector('.header__search-button');

buttonSearch.addEventListener('click', receiveInput);
// Функция отправки поискового запроса после нажатия кнопки
function receiveInput (event) {
  event.preventDefault();
  preloaderOn();
  closeSearchStatus();
  inputRequest = formSearch.elements.request.value;
  api.getNews(inputRequest)
                          .then((data) => browserStorage (data.articles))
                          .catch(function (err) {
                            console.log('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.', err);
                            lostConnection();
                          });

  //удаление старых карточек на странице
  while (cards.length > 0) {
    cards[0].parentNode.removeChild(cards[0]);
  }
}

const preloader = document.querySelector('.preloader');

function lostConnection() {
  preloader.classList.remove('preloader_display-none');
  document.querySelector('.preloader__circle').classList.add('preloader__circle_display-none');
  document.querySelector('.preloader__current-status').classList.add('preloader__current-status_display-none');
  document.querySelectorAll('.preloader__current-status')[1].classList.remove('preloader__current-status_display-none');
}

function preloaderOn() {
  preloader.classList.remove('preloader_display-none');
  document.querySelector('.preloader__circle').classList.remove('preloader__circle_display-none');
  document.querySelector('.preloader__current-status').classList.remove('preloader__current-status_display-none');
  document.querySelectorAll('.preloader__current-status')[1].classList.add('preloader__current-status_display-none');
}


let masterPageData = [];
const cards = document.getElementsByClassName('cards__cell');
const searchSection = document.querySelector('.search');
// Функция получения массива новостей

function browserStorage (serverData) {
  localStorage.clear()
  localStorage.setItem("NewsApiRequest", inputRequest);

  // КОГДА НИЧЕГО НЕ НАЙДЕНО
  if (serverData.length === 0) {
    preloader.classList.add('preloader_display-none');
    document.querySelector('.search-status').classList.remove('search-status_display-none'); // показываю секцию ненайденных результатов
    closeResultsSection();
  }
  // КОГДА НАЙДЕНЫ РЕЗУЛЬТАТЫ
  if (serverData.length !== 0) {
    // Сохраняю полученный ответ в локальное хранилище
    const serialObj = JSON.stringify(serverData);
    localStorage.setItem("NewsApiLocalStorage", serialObj);
    // Запрос данных из локального хранилища //ПОЛНЫЙ несортированный массив
    const localData = JSON.parse(localStorage.getItem("NewsApiLocalStorage"));
    //ВЫБОРОЧНО РАНЖИРОВАННЫЙ массив, сортировываю значения по первому ключу dateTime (исходный masterPageData.publishedAt)
    masterPageData =  Array.from(localData).map(mainPackage).sort().reverse();

    preloader.classList.add('preloader_display-none');
    renderAndOpenResultsSection();

    return masterPageData;
  }
}




class Card {
    constructor (date, link, urlToImage, publishedAt, title, description, name) {
    this.date = date;
    this.link = link;
    this.imageReplacement = lostedPicturesReplacement[getRandomInt(lostedPicturesReplacement.length)];
    this.image = urlToImage;
    this.publishedAt = publishedAt;
    this.title = title;
    this.description = description;
    this.name = name;
    this.cardElement = this.createCard();
  }

  createCard() {
    const cardContainer =  document.createElement('article');
    const linkElement = document.createElement('a');
    const imageElement = document.createElement('img');
    const dateElement = document.createElement('p');
    const timeElement = document.createElement('time');
    const articleContainer =  document.createElement('div');
    const headingElement = document.createElement('h4');
    const descriptionElement = document.createElement('p');
    const nameSourceElement = document.createElement('p');

    cardContainer.classList.add('cards__cell');
    cardContainer.classList.add('cards__cell_dispay-none');
    linkElement.classList.add('cards__cell-link');
    imageElement.classList.add('cards__cell-image');
    dateElement.classList.add('cards__cell-date');
    articleContainer.classList.add('cards__article-container');
    headingElement.classList.add('cards__cell-heading');
    descriptionElement.classList.add('cards__cell-text');
    nameSourceElement.classList.add('cards__cell-news-source');

    linkElement.setAttribute('href', this.link);
    linkElement.setAttribute('target', '_blank');
    imageElement.setAttribute('src', this.image ? this.image: this.imageReplacement);
    imageElement.setAttribute('alt', 'картинка к новости');
    dateElement.setAttribute('itemscope', '');
    timeElement.setAttribute('itemprop', 'pubdate');
    timeElement.setAttribute('datetime', this.date.slice(0, 10));
    timeElement.textContent = this.publishedAt;
    headingElement.textContent = this.title;
    descriptionElement.textContent = this.description;
    nameSourceElement.textContent = this.name;

    //родительство и рендер
    cardContainer.appendChild(linkElement);
    cardContainer.appendChild(imageElement);
    cardContainer.appendChild(dateElement);
    dateElement.appendChild(timeElement);
    cardContainer.appendChild(articleContainer);
    articleContainer.appendChild(headingElement);
    articleContainer.appendChild(descriptionElement);
    cardContainer.appendChild(nameSourceElement);

    return cardContainer;
  }
}

class CardList {
  constructor() {
    this.cardsContainer = document.querySelector('.cards');
    this.slidesContainer = document.querySelector('.slider__slides');
    this.bulletsContainer = document.querySelector('.slider__bullets');
    this.render();
  }

  addCard(date, link, urlToImage, publishedAt, title, description, name) { //метод для добавления карточки в список карточек
    const card = new Card(date, link, urlToImage, publishedAt, title, description, name);
    this.cardsContainer.appendChild(card.cardElement);
  }

  render() { //метод для автоматической отрисовки карточек из списка addCard
    for (let i=0; i < masterPageData.length; i++) {
      this.addCard(masterPageData[i][0], masterPageData[i][1], masterPageData[i][2], masterPageData[i][3], masterPageData[i][4], masterPageData[i][5], masterPageData[i][6]);
    }
  }
}

function closeResultsSection() {
  if (!searchSection.classList.contains('search_display-none')) {
    searchSection.classList.add('search_display-none');
  }
}// скрываю секцию с результатами поиска

function renderAndOpenResultsSection() {
  const cardList = new CardList(masterPageData);
  buttonOpenMore.addEventListener('click', threeOpenCards);
  // Функция автоматически-предварительного автооткрытия 3-х результатов
  let manualEvent = new Event("click");
  buttonOpenMore.dispatchEvent(manualEvent);

  searchSection.classList.remove('search_display-none'); // открывать секцию с результатами поиска
  closeSearchStatus();
}

function closeSearchStatus() {
  if (!document.querySelector('.search-status').classList.contains('search-status_display-none')) {
    document.querySelector('.search-status').classList.add('search-status_display-none');
  }
}// скрываю секцию с уведомлением о ненайденных результатах





const buttonOpenMore = document.getElementById('button-search');
const cardsNotDisplayed = document.getElementsByClassName('cards__cell_dispay-none');

// Функция открытия по клику 3-х карточек
function threeOpenCards(event) {
  buttonOpenMore.classList.remove('search__button-open-more_display-none');
  const childClassList = Array.from(cardsNotDisplayed);
  for (let j = 0; j < 3; j++) {
    if (j === childClassList.length - 1) {
      buttonOpenMore.classList.add('search__button-open-more_display-none');
      buttonOpenMore.removeEventListener('click', threeOpenCards);
    }
    else {
      childClassList[j].classList.remove('cards__cell_dispay-none');
    }
  }
}



const regExpHTTPLinkFirst = new RegExp(/(https|http)?:\/\/(www.)?[^-_.\s](\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})?(:\d+)?(\w+.[a-z]{2,})*(.\w+)*\/*\w*\/*\w*\/*\w*\/*\w+(\/*#?)? /i); // регулярное выражение отсеивающее ссылку в начале текста

//перевожу объект, получанный в результате fetch-запроса от сервера, в искомый массив
function mainPackage (masterPageData) {
  const descriptionTextPreview = masterPageData.description.replace(regExpHTTPLinkFirst, ' ');
  const cardDate = formatDate(masterPageData.publishedAt);
  const dateTime = masterPageData.publishedAt;
  return [dateTime, masterPageData.url, masterPageData.urlToImage, cardDate, masterPageData.title, descriptionTextPreview, masterPageData.source.name];
}

function formatDate(data){
  const cd = new Date(data);
  return cd.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'}) + ', ' + cd.toLocaleDateString('ru-RU', {year: 'numeric'});
}

// Массив и функция для выдачи случайного изображения

const lostedPicturesReplacement = [
  'https://i.ibb.co/S0JyQr0/1.png',
  'https://i.ibb.co/2gf1WYW/2.png',
  'https://i.ibb.co/HpC0xT0/3.png',
  'https://i.ibb.co/sHTH044/6.png',
  'https://i.ibb.co/BHkDpRW/7.png',
  'https://i.ibb.co/X7H7Jf3/8.png',
  'https://i.ibb.co/6Y4ZH24/9.png',
  'https://i.ibb.co/f10s1tV/12.png',
  'https://i.ibb.co/YdS9275/13.png',
  'https://i.ibb.co/NYyGhPg/14.png',
  'https://i.ibb.co/nzVbZT9/15.png',
  'https://i.ibb.co/qrPtCM5/17.png',
  'https://i.ibb.co/Zm4WSyp/18.png',
  'https://i.ibb.co/fqqrpVg/19.png',
  'https://i.ibb.co/gmB5ctQ/20.png',
  'https://i.ibb.co/NxT6zDb/21.png',
  'https://i.ibb.co/tMWwTG5/22.png',
  'https://i.ibb.co/L09dNLq/25.png',
  'https://i.ibb.co/DwnfsNs/26.png',
  'https://i.ibb.co/HGrKJfq/28.png',
  'https://i.ibb.co/dKTCJsJ/30.png'
];

// Функция для выдачи случайного целого числа от 0 (верхний предел max не включается в выдачу)
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
