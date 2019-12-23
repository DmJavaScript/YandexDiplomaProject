import "./details.css";

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




// Универсальные переменные дающиею точку отсчёта для даты

const cd = (new Date);
const gapSixDaysInMS = cd - Date.UTC(cd.getFullYear(), cd.getMonth(), cd.getDate()-6);
const dateWithoutUTC = new Date(Date.now() - gapSixDaysInMS); // вычитаем количество милисекунд за интересуемый промежуток времени
// const gapLocaleUTC = - dateWithoutUTC.getTimezoneOffset() * 60000;
const date = new Date(dateWithoutUTC);

// console.log( cd, date, gapSixDaysInMS, dateWithoutUTC, gapLocaleUTC, '604800000 - количество милисекунд за 7 полных временных суток');

// Подготовка формата даты к fetch запросу
const fromDate = 'from=' + date.toJSON(); //.slice(0, 10);
const currentDate = 'to=' + cd.toJSON(); //.slice(0, 10);

console.log(date, fromDate);
console.log(cd, currentDate);

//________________________________________________________________________

// Подготовка назвний месяцев для текущей даты и недельной давности месяца
const fromMonth = date.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();
const currentMonth = cd.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();

// Вставка текущего месяца в заголовок таблицы
document.querySelector('.search-analitics__bar-title-cur-month').textContent = '(' + currentMonth + ')';

// ПРОВЕРКА СОВПАДЕНИЯ МЕСЯЦЕВ (в недельном промежутке табличной статистики) добавляет в HTML надпись предшествующего месяца при условии, что в выборку попадают два месяца.
if (fromMonth !== currentMonth) {
  document.querySelector('.search-analitics__bar-title-prev-month').textContent = '(' + fromMonth + ')';
}
//________________________________________________________________________




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
api.getNews().then((data) => browserStorage(data));


// Сохраняю полученный ответ в локальное хранилище
let localStorageName = "newsApiAnswerLocalStorage";

function browserStorage (serverData) {
  const serialObj = JSON.stringify(serverData);
  localStorage.setItem(localStorageName, serialObj);
}

const localData = JSON.parse(localStorage.getItem(localStorageName));


// перевожу объект, получанный в результате fetch-запроса от сервера, в массив и далее отсортировываю значения по ключам publishedAt, title и description

const storageArray =  Array.from(localData.articles).map(function (storageArray) {
  const pd = new Date(storageArray.publishedAt);
  const cardDate = pd.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'}) + ', ' + pd.toLocaleDateString('ru-RU', {year: 'numeric'});
  return [cardDate, storageArray.title, storageArray.description];
});

console.log(JSON.stringify(storageArray)); // убрать перед отправкой


// сортировка последовательности дней недели, в том числе, если они с двух разных месяцев

const localDataArray = Array.from(localData.articles).map(function (localDataArray) {
  return [localDataArray.publishedAt];
}).sort();

console.log(JSON.stringify(localDataArray)); // убрать перед отправкой


//___________________________________________________________________________
//
// Ниже код идёт одним блоком

document.querySelector('.header__request-input').textContent = inputRequest;
const regExpinputRequest = new RegExp('(^|[^а-яё])('+inputRequest+')([^а-яё]|$)', 'gi'); // регулярное выражение игнорируещее регистр словосочетаний

// счётчик количества упоминаний

const storageString = storageArray.reduce((accum, current) => accum.concat(current + ' '), '');
// поскольку массив получаемый с сервера многомерный, объединяю содержимое и превращаю в простой массив методом concat, после передаю пустую строку в reduce чтобы создать строку из массива!
const statisticsMutual = document.querySelectorAll('.header__week-number');

statisticsMutual[0].textContent = localData.totalResults;
statisticsMutual[1].textContent = storageString.match(regExpinputRequest).length;

//_____________________________________________________________________________









// function sortFunction(a, b,) {
//   const dateA = new Date(a.localDataArray);
//   const dateB = new Date(b.localDataArray);
//   return dateA-dateB;
// }

// console.log(storageArray[0][0]);


// //Функция подготовки массива к загрузке в таблицу (готовая)
// //_________________________________________________

// const storageTableDate =  Array.from(localData.articles).map(function (storageTableDate) {
//   const pd = new Date(storageTableDate.publishedAt);
//   const tableDate = pd.toLocaleDateString('ru-RU', {day: 'numeric'}) + ',' + pd.toLocaleDateString('ru-RU', {weekday: 'short'});
//   return tableDate;
// });

// console.log(JSON.stringify(storageTableDate)); // убрать перед отправкой
// console.log('super');
// console.log(storageTableDate);

// const counter = storageTableDate.reduce((accum, item) => {
//   accum[item] = (accum[item] || 0) + 1 ;
//   return accum;
// } , [])

// console.log(counter);
// //_____________________________________________________


//Функции для расчёта контента таблицы
//Уменьшение полученных данных от сервера до объекта из дат публикаций и подчет повторения каждой

const storageTableDate =  Array.from(localData.articles).map(function (storageTableDate) {
  const publishDate = new Date(storageTableDate.publishedAt).toJSON().slice(0, 10); // форматирование даты для атрибута datetime HTML-разметки таблицы
  return [publishDate];
});

// const storageTableDate =  Array.from(localData.articles).map(function (storageTableDate) {
//   const publishDate = new Date(storageTableDate.publishedAt).toJSON().slice(0, 10); // форматирование даты для атрибута datetime HTML-разметки таблицы
//   const tableDate = dT.toLocaleDateString('ru-RU', {day: 'numeric'}) + ',' + dT.toLocaleDateString('ru-RU', {weekday: 'short'}); // форматирование даты заголовка строчки таблицы
//   return [publishDate, tableDate];
// });


console.log(JSON.stringify(storageTableDate)); // убрать перед отправкой
console.log('super');
console.log(storageTableDate);

// в функции ниже дополнительно сортирую данные, так как на выходе будет объект с которым сортировку не проводят
const counter = storageTableDate.sort().reduce((accum, item) => {
  accum[item] = (accum[item] || 0) + 1 ;
  return accum;
}, {})

console.log(counter); // общий объект
console.log(Object.keys(counter).publishDate); // datetime
console.log('смотри выше');
console.log(Object.values(counter)); // количество повторений


//Продолжение тестирования ___________________________заброс данных datetime в HTML-разметку

console.log(Object.keys(counter)[1].substr(0, 10));
console.log(Object.keys(counter)[1].slice(11));
console.log('смотри выше');

const publishDates = Object.keys(counter);
// const pubsdailyValues = Object.values(counter);



// document.querySelector('time').dateTime = Object.keys(counter)[1]; работает, но только для первого элемента в разметке
// document.querySelectorAll('time')[0].dateTime = Object.keys(counter)[1];
// document.querySelectorAll('time')[1].dateTime = Object.keys(counter)[2];
// document.querySelectorAll('time')[2].dateTime = Object.keys(counter)[3];
// document.querySelectorAll('time')[3].dateTime = Object.keys(counter)[4];
// document.querySelectorAll('time')[4].dateTime = Object.keys(counter)[5];
// document.querySelectorAll('time')[5].dateTime = Object.keys(counter)[6];
// document.querySelectorAll('time')[6].dateTime = Object.keys(counter)[7];


  for (let c = 0; c <publishDates.length; c++) {
    document.querySelectorAll('time')[c].dateTime = publishDates[c];
  }

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





// //____________________КОД ДЛЯ ГЛАВНОЙ СТРАНИЦЫ______________
// // перевожу объект, получанный в результате fetch-запроса от сервера, в массив и далее отсортировываю значения по ключам publishedAt, title и description

// const storageArray =  Array.from(localData.articles).map(function (storageArray) {
//   const pd = new Date(storageArray.publishedAt);
//   const cardDate = pd.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'}) + ', ' + pd.toLocaleDateString('ru-RU', {year: 'numeric'});
//   const tableDate = pd.toLocaleDateString('ru-RU', {day: 'numeric'}) + ',' + pd.toLocaleDateString('ru-RU', {weekday: 'short'});
//   return [cardDate, storageArray.title, storageArray.description, tableDate];
// });

// console.log(JSON.stringify(storageArray)); // убрать перед отправкой
// console.log('storageArray', storageArray);

// //___________ЗАВЕРШЕНИЕ КОДА ДЛЯ ГЛАВНОЙ СТРАНИЦЫ______________