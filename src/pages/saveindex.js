


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








// const searchButton = document.querySelector('#start-search');
// const error = document.querySelector('#search-input-error');



// searchButton.disabled = true; // надо отключить кнопку когда в форму поставлен курсор


/*


const inputForm = document.querySelector('#form-search');
inputForm.addEventListener('input', validate(searchInput.value));



function customValidation {
  this.invalidities = [];

}

CustomValidation.prototype = {
  addInvalidity: function(message) {
    this.invalidities.push(message);
  },
  getInvalidities: function() {
    return this.invalidities.join('. \n');
  },
  checkValidity: function (input) {


    if (input.value.lenght < 3) {
      this.addInvalidity('Длинна может быть от 3 до 30 символов');
      let element =
      element.classList.add('invalid');
      element.classList.remove('valid');

    } else {
      let element = document.querySelector('label[for="username"] .input-requirements li:nth-child(1)')
      element.classList.remove('invalid');
      element.classList.add('valid');
    }


    if (input.value.match(/([a-яёА-ЯЁ0-9\-\S]*)?/gi) ) {
      this.addInvalidity('Только буквы и цифры допустимы');
      element.classList.add('invalid');
      element.classList.remove('valid');

    }  else {
      let element = document.querySelector('label[for="username"] .input-requirements li:nth-child(1)')
      element.classList.remove('invalid');
      element.classList.add('valid');
    }

  }
};


const searchInput = document.querySelector('#search-input');

searchInput.CustomValidation = new CustomValidation();
searchInput.addEventListener('keyup', function() {
  searchInput.CustomValidation.checkValidity(this)
}


const usernameValidityChecks = [
  {
		isInvalid: function(input) {
			return input.value.length < 3;
		},
		invalidityMessage: 'Должно быть от 3 до 30 символов',
		element: document.querySelector('label[for="username"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			var illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Только буквы и цифры допустимы',
		element: document.querySelector('label[for="username"] .input-requirements li:nth-child(2)')
	}
];

*/

/*

function validate () {
  if (!searchInput.checkValidity()) {
    setupValidationMessages (searchInput);
    error.classList.remove('header__error-message_hidden');
    error.textContent = searchInput.validationMessage;
    searchInput.parentNode.classList.add('input-container__invalid');
    return false;
  }
  // searchButton.disabled = false; //включаю кнопку когда форма запроса заполнена правильно
}



function setupValidationMessages () {;
  if (searchInput.validity.valueMissing) {
    searchInput.setCustomValidity('Нужно ввести ключевое слово');
  }
  if (!searchInput.validity.valueMissing) {
  searchInput.setCustomValidity('');
  }
  if (searchInput.validity.rangeUnderflow) {
    searchInput.setCustomValidity('Должно быть от 3 до 30 символов');
  }
  if (searchInput.validity.typeMismatch) {
    searchInput.setCustomValidity('Здесь должен быть введён текст!');
  }
  if (searchInput.validity.patternMismatch ) {
    searchInput.setCustomValidity('Не более одного слова в запросе!');
  }
}

*/

// function readyButton () {
//   .disabled = true;
//   if (inputRequest.setupValidationMessages () === true) {
//     document.querySelector('#start-search').disabled = false;
//   }
//   console.log('zzzzz');
// }



/*
const inputRequest = document.querySelector('#search-input');

class RequestValidation {
  constructor(inputRequest) {
    this.search = inputRequest;
    this.error = document.querySelector('#search-input-error') ;
    this.buttonElement
      .querySelector('#start-search')
      .addEventListener('submit', validate());
  }

  validate () {
    this.buttonElement.disabled = true;
    if (!this.search.checkValidity()) {
      this.search.event.preventDefault();
      setupValidationMessages (this.search);
      this.error.textContent = this.search.validationMessage;
      this.search.parentNode.classList.add('input-container__invalid');
      this.error.classList.remove('header__error-message_hidden');
      return false;
    }
    this.buttonElement.disabled = false;
  }

  setupValidationMessages () {
    if (this.search.validity.valueMissing) {
      this.search.setCustomValidity('Нужно ввести ключевое слово');
    }
    else if (this.search.validity.tooShort) {
      this.search.setCustomValidity('Должно быть от 3 до 30 символов');
    }
    else if (this.search.validity.typeMismatch) {
      this.search.setCustomValidity('Здесь должен быть введён текст!');
    }
    else if (this.earch.validity.patternMismatch ) {
      this.search.setCustomValidity('Не более одного слова в запросе!');
    }

    console.log(this.request.validity);
  }

  removeValidation () {
    event.target.parentNode.classList.remove('input-container__invalid');

    return this.search;
  }
}


const requestValidation = new RequestValidation (inputRequest);

*/

// searchButton.addEventListener('submit', finalFieldCheck);



// .error-message {
//   opacity: 0;
//


















//Выше валидация

/*


const gapDurationInMS = 604800000; // количество милисекунд за 7 дней от текущей даты
const date = new Date(Date.now() - gapDurationInMS); // вычитаем количество милисекунд за интересуемый промежуток времени
const cd = new Date();



// const fromDate = 'from=' + date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-'+ ('0' + date.getDate()).slice(-2);
// const currentDate = 'to=' + cd.getFullYear() + '-' + ('0' + (cd.getMonth() + 1)).slice(-2) + '-'+ ('0' + cd.getDate() - 7).slice(-2);

const fromDate = 'from=' + date.toJSON().slice(0, 10);
const currentDate = 'to=' + cd.toJSON().slice(0, 10);



console.log(date, fromDate);
console.log(cd, currentDate);




inputRequest = 'природа';

class Api {
  // constructor(options) {
  //   this.options = options;
  // }

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
    // .then((data) => {
    //   console.log(data, data.articles[3].urlToImage, data.articles[3].publishedAt, data.articles[3].title, data.articles[3].description, data.articles[3].source.name);
    // })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    })
  }
}

const api = new Api();
api.getNews().then((data) => console.log(data, data.articles[3].urlToImage, data.articles[3].publishedAt, data.articles[3].title, data.articles[3].description, data.articles[3].source.name));


// const rawDate = new Date(data.articles[3].publishedAt);

const cardYear = {year: 'numeric'};
const cardDayMonth = {day: 'numeric', month: 'long'};
const cardsDate = cd.toLocaleDateString('ru-RU', cardDayMonth) + ', ' + cd.toLocaleDateString('ru-RU', cardYear);
console.log(cardsDate);

// const now = new Date();
// const articlePublishedAt = now.format(dd mm, yyyy);
// console.log(articlePublishedAt);


//_______________________________________


  addCard(date, avatar, name, email, message) { //метод для добавления карточки в список
    const{cardElement} = new CreateSlide(date, avatar, name, email, message);
    this.container.appendChild(cardElement);
  }

  renderCards() { //метод для автоматической отрисовки карточек из списка addCard
    this.data.forEach(({date, avatar, name, email, message}) => this.addCard(date, avatar, name, email, message))
  }

*/

// pattern='([А-яё0-9\-\S]*)?' - из HTML - не подходит в моём случае









/*

// //____________________КОД ДЛЯ ГЛАВНОЙ СТРАНИЦЫ______________
// // перевожу объект, получанный в результате fetch-запроса от сервера, в массив и далее отсортировываю значения по ключам publishedAt, title и description

// const storageArray =  Array.from(localData.articles).map(function (storageArray) {
//   const pd = new Date(storageArray.publishedAt);
//   const cardDate = pd.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'}) + ', ' + pd.toLocaleDateString('ru-RU', {year: 'numeric'});
//   return [cardDate, storageArray.url, storageArray.urlToImage, storageArray.title, storageArray.description, storageArray.source.name];
// }).sort().reverse();

// console.log(JSON.stringify(storageArray)); // убрать перед отправкой
// console.log('storageArray', storageArray);

// //___________ЗАВЕРШЕНИЕ КОДА ДЛЯ ГЛАВНОЙ СТРАНИЦЫ______________

*/
















































// document.querySelector('time').dateTime = Object.keys(counter)[1]; работает, но только для первого элемента в разметке
// document.querySelectorAll('time')[0].dateTime = Object.keys(counter)[1];
// document.querySelectorAll('time')[1].dateTime = Object.keys(counter)[2];
// document.querySelectorAll('time')[2].dateTime = Object.keys(counter)[3];
// document.querySelectorAll('time')[3].dateTime = Object.keys(counter)[4];
// document.querySelectorAll('time')[4].dateTime = Object.keys(counter)[5];
// document.querySelectorAll('time')[5].dateTime = Object.keys(counter)[6];
// document.querySelectorAll('time')[6].dateTime = Object.keys(counter)[7];




//  for (let e = 0; e <publishDates.length; e++) {
//   document.querySelectorAll('.search-analitics__bar')[e].querySelector('.search-analitics__data-mark').textContent = publishDates[e];
// }


// const nodes = document.querySelectorAll('p');
// Array.prototype.forEach.call(nodes, node => {
//   node.style.color = 'red';
// });

// Добаботать код выше ________________________________________________________




/* Техническая копия кода выше

// const pd = new Date(Object.keys(counter));
//   const tableDate = pd.toLocaleDateString('ru-RU', {day: 'numeric'}) + ',' + pd.toLocaleDateString('ru-RU', {weekday: 'short'});

// const dayTitles = ['11, ср', '12, чт', '13, пт', '14, сб', '15, вс', '16, пн', '17, вт'];
// console.log(dayTitles);


// let pClassList = document.getElementsByClassName('search-analitics__bar');
// const child = [];

// for(let i=0; i < pClassList.length; i++){
//   const parentElement = pClassList[i];
//   let childClassList = parentElement.getElementsByClassName('search-analitics__data-mark');
//   for (let j= 0; j < childClassList.length; j++){
//     child.push(childClassList[j]);
//   }
// }

// child[0].textContent = dayTitles[0];
// child[1].textContent = dayTitles[1];
// child[2].textContent = dayTitles[2];
// child[3].textContent = dayTitles[3];
// child[4].textContent = dayTitles[4];
// child[5].textContent = dayTitles[5];
// child[6].textContent = dayTitles[6];




*/





















// storageArray.forEach([0] = '10'); // - - - ?
// console.log(storageArray);


// for ([].0 in storageArray) {
//   console.log( "Ключ: " + [].0 + " значение: " + storageArray[[].0]);
// }







// const dayTitles = [[11, ср], [12, чт], [13, пт], [14, сб], [15, вс], [16, пн], [17, вт]];
// console.log(dayTitles);




// document.querySelector('.header__week-data')[1].getElementsByClassName('header__week-number')[0].textContent = storageString.match(regExpinputRequest).length;


// document.querySelector('.search-analitics__mon').textContent = storageString.match(regExpinputRequest).length;

// const storageDeepArray = Array.from(storageArray.title);
// console.log(storageDeepArray);

// изначальный  код
// const storageArray =  Array.from(localData.articles).map((storageArray) => {
//   return [storageArray.publishedAt + ' ' + storageArray.title + ' ' + storageArray.description]
// }); // перевожу объект в массив и далее отсортировываю значения по ключам publishedAt, title и description
// const storageString = storageArray.reduce((accum, current) => {
//   return accum.concat(current + ' ');
// }, '');


// ----------------------------------------------------------------------------------------------
/*

//_______________________________________________________________
//
// неоптимальный спобом получения html коллекции (,но работающий)

let dateMark = document.getElementsByTagName('time');

for (let i=0; i < dateMark.length; i++) {
  let element = dateMark[i];
  let child = element.parentNode.firstChild;
  let index = 0;

  while (true) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      index++;
    }

    if (child === element || !child.nextSibling) {
      break;
    }

    child = child.nextSibling;
  }

  element.dataset.number = index;
}

console.log(dateMark.length);
console.log(dateMark);

//_________________________________________________________________

*/

//счётчик упоминаний в заголовках

// const users = [
//   { id: 11, name: 'Adam', age: 23, group: 'editor' },
//   { id: 47, name: 'John', age: 28, group: 'admin' },
//   { id: 85, name: 'William', age: 34, group: 'editor' },
//   { id: 97, name: 'Oliver', age: 28, group: 'admin' }
// ];

// const groupByAge = users.reduce((acc, it) => {
//   acc[it.age] = acc[it.age] + 1 || 1;
//   return acc;
// }, {});

// console.log(groupByAge);

// res is []

// мой вариант решения
// выбрать из объекта только подобъекты description и title методом reduce
// создать из выбранного массив из слов
// пройти там фильтром

// const listInputRequst = [...new Set(localData.map(localData => localData.articles.title))];
// console.log(listInputRequst);

// function findVowels(arr) {
//   const wordDuplicate = arr.filter(e => wordForCheck.split('').includes(e));
//   return wordDuplicate.length;
// }


// const title = NewsApiLocalStorage.reduce((acc, it) => {
//   acc[it.age] = acc[it.articles.title] + 1 || 1;
//   return acc;
// }, {});

// console.log(title);

// Получили данные с сервера и записали их в переменную data


// const titles = localData.articles.filter(function(inputRequest) {
//   return inputRequest === 'природа' || inputRequest === 'Природа';
// });


// console.log(localStorage.reduce(inputRequest, localData));

// const keysValuesArray = Object.keys(localData.articles).forEach(function (key) {
//   console.log(`${key} — ${localData.articles[publishedAt.key]}`);
// });

// console.log(keysValuesArray);


// for (let storageArray.publishedAt in Array.from(localData.articles)) {
//   console.log( "Ключ: " + storageArray.publishedAt + " значение: " +  Array.from(localData.articles)[storageArray.publishedAt] );
// }








// import { deepStrictEqual } from "assert";

// const fromDate = 'from=' + cd.getFullYear() + '-' + ('0' + (cd.getMonth() + 1)).slice(-2) + '-'+ ('0' + cd.getDate() - 7)).slice(-2);


//Функция добавления заголовков даты с днём недели в столбец таблицы

// const dayTitles = ['11, ср', '12, чт', '13, пт', '14, сб', '15, вс', '16, пн', '17, вт'];
// console.log(dayTitles);


// let pClassList = document.getElementsByClassName('search-analitics__bar');
// const child = [];

// for(let g=0; g < pClassList.length; g++){
//   const parentElement = pClassList[g];
//   let childClassList = parentElement.getElementsByClassName('search-analitics__data-mark');
//   for (let l= 0; l < childClassList.length; l++){
//     child.push(childClassList[l]);
//     return child.textContent = dayTitles;
//   }
// }




// const dayValues = ['11', '12', '13', '14', '15', '36', '17'];
// const dayValuesDOM = [];

// const paClassList = document.getElementsByClassName('search-analitics__data');

// for(let i=0; i < paClassList.length; i++){
//   const paElement = paClassList[i];
//   let chClassList = Array.from(paElement.getElementsByClassName('search-analitics__value'));
//   for (let j= 0; j < chClassList.length; j++){
//     dayValuesDOM.push(chClassList[j]);
//   }
// }

// dayValuesDOM[0].textContent = dayValues[0];
// dayValuesDOM[0].style.width = dayValues[0] + "%";
// dayValuesDOM[1].textContent = dayValues[1];
// dayValuesDOM[1].style.width = dayValues[1] + "%";
// dayValuesDOM[2].textContent = dayValues[2];
// dayValuesDOM[2].style.width = dayValues[2] + "%";
// dayValuesDOM[3].textContent = dayValues[3];
// dayValuesDOM[3].style.width = dayValues[3] + "%";
// dayValuesDOM[4].textContent = dayValues[4];
// dayValuesDOM[4].style.width = dayValues[4] + "%";
// dayValuesDOM[5].textContent = dayValues[5];
// dayValuesDOM[5].style.width = dayValues[5] + "%";
// dayValuesDOM[6].textContent = dayValues[6];
// dayValuesDOM[6].style.width = dayValues[6] + "%";
// console.log(dayValuesDOM);




// document.querySelector('.search-analitics__bar:nth-child(2) td .search-analitics__value').style.width = "45%";












// function sortFunction(a, b,) {
//   const dateA = new Date(a.localDataArray);
//   const dateB = new Date(b.localDataArray);
//   return dateA-dateB;
// }

// console.log(storageArray[0][0]);


// //Функция подготовки массива к загрузке в таблицу (готовая)
// //_________________________________________________

// const storageTable =  Array.from(localData.articles).map(function (storageTable) {
//   const pd = new Date(storageTable.publishedAt);
//   const tableDate = pd.toLocaleDateString('ru-RU', {day: 'numeric'}) + ',' + pd.toLocaleDateString('ru-RU', {weekday: 'short'});
//   return tableDate;
// });

// console.log(JSON.stringify(storageTable)); // убрать перед отправкой
// console.log('super');
// console.log(storageTable);

// const counter = storageTable.reduce((accum, item) => {
//   accum[item] = (accum[item] || 0) + 1 ;
//   return accum;
// } , [])

// console.log(counter);
// //_____________________________________________________



// const storageTable =  Array.from(localData.articles).map(function (storageTable) {
//   const publishDate = new Date(storageTable.publishedAt).toJSON().slice(0, 10); // форматирование даты для атрибута datetime HTML-разметки таблицы
//   const tableDate = dT.toLocaleDateString('ru-RU', {day: 'numeric'}) + ',' + dT.toLocaleDateString('ru-RU', {weekday: 'short'}); // форматирование даты заголовка строчки таблицы
//   return [publishDate, tableDate];
// });
