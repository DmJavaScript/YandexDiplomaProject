import "./index.css";






//----корректный расчёт даты и времени работающий ---------
// const cd = new Date;
// const gapSixDaysInMS = cd - Date.UTC(cd.getFullYear(), cd.getMonth(), cd.getDate()-6);
// const dateWithoutUTC = new Date(Date.now() - gapSixDaysInMS); // вычитаем количество милисекунд за интересуемый промежуток времени
// const gapLocaleUTC = - dateWithoutUTC.getTimezoneOffset() * 60000;
// const date = new Date(dateWithoutUTC - gapLocaleUTC);

// // console.log( cd, date, gapSixDaysInMS, dateWithoutUTC, gapLocaleUTC, '604800000 - количество милисекунд за 7 полных временных суток');

// // Подготовка формата даты к fetch запросу
// const fromDate = 'from=' + date.toJSON(); //.slice(0, 10);
// const currentDate = 'to=' + cd.toJSON(); //.slice(0, 10);

// console.log(date, fromDate);
// console.log(cd, currentDate);
// // ---------------------------------------------------------


// Универсальные переменные дающиею точку отсчёта для даты
const gapDurationInMS = 604800000; // количество милисекунд за 7 дней от текущей даты
const date = new Date(Date.now() - gapDurationInMS); // вычитаем количество милисекунд за интересуемый промежуток времени
const cd = new Date();

// Подготовка формата даты к fetch запросу
const fromDate = 'from=' + date.toJSON().slice(0, 10);
const currentDate = 'to=' + cd.toJSON().slice(0, 10);

console.log(date, fromDate);
console.log(cd, currentDate);

let inputRequest = 'природа';

class Api {
  getNews () {
    return fetch('https://newsapi.org/v2/everything?q=' + `${inputRequest}` + '&pageSize=100&' + `${fromDate}` + '&' + `${currentDate}`+ '&apiKey=a77a12e2e4484b4fb5cc12d192f94b00', {
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
api.getNews().then((data) => browserStorage (data)); // в индекс HTML результат передается напрямую в класс без сохранения в локальное хранилище





// Сохраняю полученный ответ в локальное хранилище

function browserStorage (serverData) {
  const serialObj = JSON.stringify(serverData.articles);
  localStorage.setItem("NewsApiLocalStorage", serialObj);
}

const localData = JSON.parse(localStorage.getItem("NewsApiLocalStorage"));
console.log('localData', localData);

function formatDate(data){
  const cd = new Date(data);
  return cd.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'}) + ', ' + cd.toLocaleDateString('ru-RU', {year: 'numeric'});
}




const textTemplate = 'https://www.youtube.com/watch?v=7J4vz0SR8ak&amp;feature=youtu.be Все началось с безумной песчаной бури вокруг Воинского автобуса майя, так что, когда я начинал, за нами следовало не так много велосипедистов. Но с каждой секундой этого дикого заката в пустыне все …';

const regExpHTTPLinkFirst = new RegExp(/(https|http)?:\/\/(www.)?[^-_.\s](\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})?(:\d+)?(\w+.[a-z]{2,})*(.\w+)*\/*\w*\/*\w*\/*\w*\/*\w+(\/*#?)? /i); // регулярное выражение отсеивающее ссылку в начале текста

// const filteredURL = textTemplate.match(regExpHTTPLinkFirst)[0];

// console.log(filteredURL.length);
// console.log(textTemplate.slice(filteredURL.length));
// console.log(textTemplate.text().replace(filteredURL, ''));


// перевожу объект, получанный в результате fetch-запроса от сервера, в массив и далее отсортировываю значения по ключу dateTime(исходный storageArray.publishedAt)

const storageArray =  Array.from(localData).map(function (storageArray) {
  const descriptionTextPreview = storageArray.description.replace(regExpHTTPLinkFirst, '');
  const cardDate = formatDate(storageArray.publishedAt);
  const dateTime = storageArray.publishedAt;
  return [dateTime, storageArray.url, storageArray.urlToImage, cardDate, storageArray.title, descriptionTextPreview, storageArray.source.name];
}).sort().reverse();

console.log(JSON.stringify(storageArray)); // убрать перед отправкой
console.log('storageArray', storageArray);

//___________ЗАВЕРШЕНИЕ КОДА ДЛЯ ГЛАВНОЙ СТРАНИЦЫ______________



// employees.sort(function(a, b){
//   var dateA=new Date(a.retiredate), dateB=new Date(b.retiredate)
//   return dateA-dateB //сортировка по возрастающей дате
//   })

// const newData = Array.from(localData);

// console.log(newData.sort(function (a, b) {
//   const dateA = new Date(a.publishedAt), dateB = new Date(a.publishedAt);
//   return dateB - dateA;
// }));



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

function shuffle(arr){
	let j, temp;
	for(let i = arr.length - 1; i > 0; i--) {
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

shuffle(lostedPicturesReplacement);

// Функция для выдачи случайного целого числа от 0 (верхний предел max не включается в выдачу)

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

console.log(lostedPicturesReplacement.length); // удалить перед отправкой
console.log(lostedPicturesReplacement[getRandomInt(21)]); // удалить перед отправкой






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

// console.log(localData[1].url, localData[1].urlToImage, formatDate(localData[1].publishedAt), localData[1].title, localData[1].description, localData[1].source.name);
// console.log(storageArray[1][0], storageArray[1][1], storageArray[1][2], storageArray[1][3], storageArray[1][4], storageArray[1][5]);


class CardList {
  constructor(storageArray) {
    this.cardsContainer = document.querySelector('.cards');
    this.slidesContainer = document.querySelector('.slider__slides');
    this.bulletsContainer = document.querySelector('.slider__bullets');
    this.render();
  }

  addCard(date, link, urlToImage, publishedAt, title, description, name) { //метод для добавления карточки в список карточек
    // console.log(date, link, urlToImage, publishedAt, title, description, name);
    const card = new Card(date, link, urlToImage, publishedAt, title, description, name);
    this.cardsContainer.appendChild(card.cardElement);
  }

  render() { //метод для автоматической отрисовки карточек из списка addCard
    for (let i=0; i < storageArray.length; i++) {
      this.addCard(storageArray[i][0], storageArray[i][1], storageArray[i][2], storageArray[i][3], storageArray[i][4], storageArray[i][5], storageArray[i][6]);
    }
  }
}

const cardList = new CardList(storageArray);




// Функция открытия по клику 3-х карточек из скрытой предварительно разметки всего набора карточек.

const buttonOpenMore = document.querySelector('.search__button-open-more');
const cards = document.getElementsByClassName('cards__cell_dispay-none');

buttonOpenMore.addEventListener('click', function () {
  const childClassList = Array.from(cards);
  for (let j = 0; j < 3; j++) {
    if (j === childClassList.length - 1) {
      buttonOpenMore.remove();
    } else {
      childClassList[j].classList.remove('cards__cell_dispay-none');
    }
  }
});

// Функция автоматически-предварительного открытия 3-х карточек при первичном автооткрытии секции результатов.

let event = new Event("click");
buttonOpenMore.dispatchEvent(event);









//архив
//__________________________________________________
// if (!this.classList.contains('cards__cell_dispay-none')) {
  //   document.querySelector('.search__button-open-more').remove();
  // }
  // if (cards.length == null) {
  //   document.querySelector('.search__button-open-more').remove();
  // }
  // const cards = document.querySelectorAll('.cards__cell_dispay-none');
  // console.log(cards.length);


   // buttonOpenMore.addEventListener('click', function () {
  //   const childClassList = Array.from(cards);
  //   for (let j = 0; j < 3; j++) {
  //     if (document.querySelector('.cards__cell_dispay-none') == null) {
  //       buttonOpenMore.remove();
  //     } else {
  //       childClassList[j].classList.remove('cards__cell_dispay-none');
  //     }
  //   }
  // });