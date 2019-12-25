import "./details.css";




const cd = (new Date);
const gapSixDaysInMS = cd - Date.UTC(cd.getFullYear(), cd.getMonth(), cd.getDate()-6);
const dateWithoutUTC = new Date(Date.now() - gapSixDaysInMS); // вычитаем количество милисекунд за интересуемый промежуток времени
const date = new Date(dateWithoutUTC);

// Подготовка назвний месяцев для текущей даты и недельной давности месяца
const fromMonth = date.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();
const currentMonth = cd.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();

// Вставка текущего месяца в заголовок таблицы
document.querySelector('.search-analitics__bar-title-cur-month').textContent = '(' + currentMonth + ')';

// ПРОВЕРКА СОВПАДЕНИЯ МЕСЯЦЕВ (в недельном промежутке табличной статистики) добавляет в HTML надпись предшествующего месяца при условии, что в выборку попадают два месяца.
if (fromMonth !== currentMonth) {
  document.querySelector('.search-analitics__bar-title-prev-month').textContent = '(' + fromMonth + ')';
}

//Достаю сохранёный ранее ответ сервера из локального хранилища
const localData = JSON.parse(localStorage.getItem("NewsApiLocalStorage"));
console.log('localData ПОЛНЫЙ несортированный', localData);

//ВЫБОРОЧНО РАНЖИРОВАННЫЙ массив
const storageArray =  Array.from(localData).map(function (storageArray) {
  const text = storageArray.title + ' ' + storageArray.description;
  return [text];
}).sort();
console.log('storageArray ВЫБОРОЧНО РАНЖИРОВАННЫЙ по дате публикации', storageArray);

// Ниже код будет переработан
let inputRequest = 'природа';
document.querySelector('.header__request-input').textContent = inputRequest;
const regExpinputRequest = new RegExp('(^|[^а-яё])('+inputRequest+')([^а-яё]|$)', 'gi'); // регулярное выражение игнорируещее регистр словосочетаний


//счётчик количества упоминаний
const storageString = storageArray.reduce((accum, current) => accum.concat(current + ' '), '');
//поскольку массив получаемый с сервера многомерный, объединяю содержимое и превращаю в простой массив методом concat, после передаю пустую строку в reduce чтобы создать строку из массива!
const statistics = document.querySelectorAll('.header__week-number');
statistics[0].textContent = localData.length;
statistics[1].textContent = storageString.match(regExpinputRequest).length;


//Сужение до массива из дат публикаций
const storageTable =  Array.from(localData).map(function (storageTable) {
  const dateTime = storageTable.publishedAt.slice(0, 10);
  return [dateTime];
});

console.log('новый объект возможно избыточный', storageTable);

// сортирую данные, так как на выходе будет финальный объект для столбиков таблицы с которым сортировку не проводят
const counter = storageTable.sort().reduce((accum, item) => {
  accum[item] = (accum[item] || 0) + 1 ;
  return accum;
}, {})

console.log('Объект для столбиков', counter);
console.log('количество повторений', Object.values(counter));


//заброс данных в HTML-разметку
const publishDates = Object.keys(counter); //конкретный день недели
const daily = Object.values(counter); //количество каждодневных публикаций

for (let c = 0; c <publishDates.length; c++) {
  document.querySelectorAll('time')[c].dateTime = publishDates[c];
  document.querySelectorAll('time')[c].textContent = new Date(publishDates[c]).toLocaleDateString('ru-RU', {day: 'numeric'}) + ', ' + new Date(publishDates[c]).toLocaleDateString('ru-RU', {weekday: 'short'});
  document.querySelectorAll('.search-analitics__value')[c].textContent = daily[c];
  document.querySelectorAll('.search-analitics__value')[c].style.width = daily[c] + '%';
}