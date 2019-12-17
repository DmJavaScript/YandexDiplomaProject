import "./details.css";

// Просьба проверять только HTML код, я не хочу терять попытку и у меня только наброски к нему!
import { deepStrictEqual } from "assert";



const gapDurationInMS = 604800000; // количество милисекунд за 7 дней от текущей даты
const date = new Date(Date.now() - gapDurationInMS); // вычитаем количество милисекунд за интересуемый промежуток времени
const cd = new Date();

const fromDate = 'from=' + date.toJSON().slice(0, 10);
const currentDate = 'to=' + cd.toJSON().slice(0, 10);


console.log(date, fromDate);
console.log(cd, currentDate);





const fromMonth = date.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();
const currentMonth = cd.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();

// текущий месяц в заголовке таблицы

document.querySelector('.search-analitics__bar-title-cur-month').textContent = '(' + currentMonth + ')';

// ПРОВЕРКА СОВПАДЕНИЯ МЕСЯЦЕВ (в недельном промежутке табличной статистики) выводит надпись предшествующего месяца при условии, что в выборку попадают два месяца.

if (fromMonth !== currentMonth) {
  document.querySelector('.search-analitics__bar-title-prev-month').textContent = '(' + fromMonth + ')';
}



let inputRequest = 'природа';

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

// const api = new Api();
// api.getNews().then((data) => console.log(data,  data.totalResults, data.reduce('Природа'), data.articles[3].urlToImage, data.articles[3].publishedAt, data.articles[3].title, data.articles[3].description, data.articles[3].source.name));


const api = new Api();
api.getNews().then((data) => browserStorage(data));




function browserStorage (serverData) {
  const serialObj = JSON.stringify(serverData);
  localStorage.setItem("NewsApiLocalStorage", serialObj);
}

const localData = JSON.parse(localStorage.getItem("NewsApiLocalStorage"));



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

// ;

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


inputRequest = 'путешествия';

// for (let storageArray.publishedAt in Array.from(localData.articles)) {
//   console.log( "Ключ: " + storageArray.publishedAt + " значение: " +  Array.from(localData.articles)[storageArray.publishedAt] );
// }

const storageArray =  Array.from(localData.articles).map(function (storageArray) {
  const pd = new Date(storageArray.publishedAt);
  const cardDate = pd.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'}) + ', ' + pd.toLocaleDateString('ru-RU', {year: 'numeric'});
  const tableDate = pd.toLocaleDateString('ru-RU', {day: 'numeric'}) + ',' + pd.toLocaleDateString('ru-RU', {weekday: 'short'});
  return [cardDate, storageArray.title, storageArray.description, tableDate];
}); // перевожу объект в массив и далее отсортировываю значения по ключам publishedAt, title и description

console.log(JSON.stringify(storageArray)); // убрать перед отправкой

// сортировка последовательности дней недели, в том числе, если они с двух разных месяцев

const localDataArray = Array.from(localData.articles).map(function (localDataArray) {
  return [localDataArray.publishedAt];
}).sort();

console.log(JSON.stringify(localDataArray));


// function sortFunction(a, b,) {
//   const dateA = new Date(a.localDataArray);
//   const dateB = new Date(b.localDataArray);
//   return dateA-dateB;
// }

// console.log(storageArray[0][0]);




const storageTableDate =  Array.from(localData.articles).map(function (storageTableDate) {
  const pd = new Date(storageTableDate.publishedAt);
  const tableDate = pd.toLocaleDateString('ru-RU', {day: 'numeric'}) + ',' + pd.toLocaleDateString('ru-RU', {weekday: 'short'});
  return [tableDate];
});

console.log(JSON.stringify(storageTableDate)); // убрать перед отправкой


const counter = storageTableDate.reduce((accum, item) => {
  accum[item] = (accum[item] || 0) + 1 ;
  return accum;
} , [])

console.log(counter);




// storageArray.forEach([0] = '10'); // - - - ?
// console.log(storageArray);


// for ([].0 in storageArray) {
//   console.log( "Ключ: " + [].0 + " значение: " + storageArray[[].0]);
// }



const storageString = storageArray.reduce((accum, current) => accum.concat(current + ' '), ''); // поскольку массив был многомерный, объединяю содержимое и превращаю в простой массив методом concat, после передаю пустую строку в reduce чтобы создать строку из массива!

const regExpinputRequest = new RegExp('(^|[^а-яё])('+inputRequest+')([^а-яё]|$)', 'gi');

console.log(storageString.match(regExpinputRequest).length);

document.querySelector('.header__request-input').textContent = inputRequest;
document.querySelector('.header__week-number').textContent = localData.totalResults;
document.querySelector('.header__week-number_mentions').textContent = storageString.match(regExpinputRequest).length;

document.querySelector('.search-analitics__mon').textContent = storageString.match(regExpinputRequest).length;
document.querySelector('.search-analitics__tue').textContent = storageString.match(regExpinputRequest).length;
document.querySelector('.search-analitics__wed').textContent = storageString.match(regExpinputRequest).length;
document.querySelector('.search-analitics__thu').textContent = storageString.match(regExpinputRequest).length;
document.querySelector('.search-analitics__fri').textContent = storageString.match(regExpinputRequest).length;
document.querySelector('.search-analitics__sat').textContent = storageString.match(regExpinputRequest).length;
document.querySelector('.search-analitics__sun').textContent = storageString.match(regExpinputRequest).length;

document.querySelector('.search-analitics__mon').style.width = '30%';
// const storageDeepArray = Array.from(storageArray.title);
// console.log(storageDeepArray);

// изначальный  код
// const storageArray =  Array.from(localData.articles).map((storageArray) => {
//   return [storageArray.publishedAt + ' ' + storageArray.title + ' ' + storageArray.description]
// }); // перевожу объект в массив и далее отсортировываю значения по ключам publishedAt, title и description
// const storageString = storageArray.reduce((accum, current) => {
//   return accum.concat(current + ' ');
// }, '');
