import "./details.css";


//Достаю сохранёный ранее ответ сервера из локального хранилища
const recivedData = JSON.parse(localStorage.getItem("NewsApiLocalStorage"));
//Тема запроса, сохранённого в локальном хранилище
const recivedDataRequest = localStorage.getItem("NewsApiRequest");
const regExpRequest = new RegExp('\\s' + recivedDataRequest +'\\s', 'gi');
// регулярное выражение игнорируещее регистр словосочетаний



//Рендер темы запроса
document.querySelector('.header__request-input').textContent = recivedDataRequest.charAt(0).toUpperCase() + recivedDataRequest.slice(1);;
const statistics = document.querySelectorAll('.header__week-number');
statistics[0].textContent = recivedData.length; // Новостей за неделю


//Сужение всех заголовков до строки и подсчёт количества совпадений
function titleRepitsNumber () {
  const titlesArray = recivedData.map(storageString => [storageString.title]);
  return JSON.stringify(titlesArray).match(regExpRequest).length;
}

statistics[1].textContent = titleRepitsNumber(); // Упоминаний в заголовках




//ВЫБОР ДАТЫ и ПОВТОРЕНИЙ для таблицы
const detailsPageData = recivedData.map(function (detailsPageData) {
  const dateTime = detailsPageData.publishedAt.slice(0, 10);
  const text = detailsPageData.title + ' ' + detailsPageData.description;
  return [dateTime, [text]];
}).sort();


/* Цикл подсчёта ПОВТОРЕНИЙ КЛЮЧЕВОГО СЛОВА в общем тексте заголовков и превью,
простановка нулей там где результатов нет и перезапись обновленных данных в исходный массив */
for (let l=0; l<detailsPageData.length; l++) {
  const matchedMentiones = (detailsPageData[l][1]).toString().match(regExpRequest);
  if (matchedMentiones !== null) {
    detailsPageData[l][1] = detailsPageData[l][1].splice(1, 1);
    detailsPageData[l][1] = matchedMentiones.length;
  } else {
    detailsPageData[l][1] = detailsPageData[l][1].splice(1, 1);
    detailsPageData[l][1] = 0;
  }
}


const createdDates = [];
// цикл для получения массива ВЫБОРОЧНО РАНЖИРОВАННОГО по дате публикации
for (let g=0; g < detailsPageData.length; g++) {
  const pubdate = detailsPageData[g][0];
  const m = detailsPageData[g][1];
  if (m === 1 || m === 0) {
    createdDates.push(pubdate);
  } else {
    let times=(n,f)=>{while(n-->0)f();}
    times(m,()=>createdDates.push(pubdate));
  }
}




const cd = (new Date);
const gapSixDaysInMS = cd - Date.UTC(cd.getFullYear(), cd.getMonth(), cd.getDate()-6);
const dateWithoutUTC = new Date(Date.now() - gapSixDaysInMS); // вычитаем количество милисекунд за интересуемый промежуток времени
const date = new Date(dateWithoutUTC);


/*для полноты отображения нулевых дней в строках
таблицы ввёл корректировочный массив чтобы они
не были съедены методом reduce, эту разницу
компенсирую до передачи в таблицу! */
const zeroCalibrationArray = [];
const startDate = date.toJSON().slice(0,10);
const todayCD = cd.toJSON().slice(0,10);
const dateMove = new Date(startDate);
let oldDate = startDate;

while (oldDate < todayCD){
  oldDate = dateMove.toISOString().slice(0,10);
  zeroCalibrationArray.push(oldDate);
  dateMove.setDate(dateMove.getDate()+1);
};


const plusExtaDay = createdDates.concat(zeroCalibrationArray);

// сортирую Объект для столбиков с одной лишней публикацией за каждый день
const counter = plusExtaDay.sort().reduce((accum, item) => {
  accum[item] = (accum[item] || 0) + 1 ;
  return accum;
}, {})



// количество превышающее реальность на одну публикацию в день
const daily = Object.values(counter);
for(let i = 0; i < daily.length; ++i) {
  daily[i] -= 1; //корректирую все данные до реальных значений
}




// Подготовка названий месяцев для текущей даты и недельной давности месяца
const fromMonth = date.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();
const currentMonth = cd.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase();

// Вставка текущего месяца в заголовок таблицы
document.querySelector('.search-analitics__bar-title-cur-month').textContent = '(' + currentMonth + ')';

// ПРОВЕРКА СОВПАДЕНИЯ МЕСЯЦЕВ (в недельном промежутке табличной статистики) добавляет в HTML надпись предшествующего месяца при условии, что в выборку попадают два месяца.
if (fromMonth !== currentMonth) {
  document.querySelector('.search-analitics__bar-title-prev-month').textContent = '(' + fromMonth + ')';
}

// заброс данных в HTML-разметку
const publishDates = Object.keys(counter);

for (let c = 0; c <publishDates.length; c++) {
  document.querySelectorAll('time')[c].dateTime = publishDates[c];
  document.querySelectorAll('time')[c].textContent = new Date(publishDates[c]).toLocaleDateString('ru-RU', {day: 'numeric'}) + ', ' + new Date(publishDates[c]).toLocaleDateString('ru-RU', {weekday: 'short'});
  document.querySelectorAll('.search-analitics__value')[c].textContent = daily[c];
  document.querySelectorAll('.search-analitics__value')[c].style.width = daily[c] + '%';
}
