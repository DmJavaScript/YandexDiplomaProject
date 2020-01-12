
import {recivedData, regExpRequest, statisticsResults, statisticsUpgradedResults, currentDate, sevenDaysAgo, zeroCalibrationArray, daily} from "./constants.js";

//страница index.js
export function formatDate(data){
  const customDate = new Date(data);
  return customDate.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'}) + ', ' + customDate.toLocaleDateString('ru-RU', {year: 'numeric'});
}

// Функция для выдачи случайного целого числа от 0 (верхний предел max не включается в выдачу)
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



//страница details.js //Сужение всех заголовков до строки и подсчёт количества совпадений
export function titleRepitsNumber () {
  const titlesArray = recivedData.map(storageString => [storageString.title]);
  return JSON.stringify(titlesArray).match(regExpRequest).length;
}

export function textDataToNumbersInArray () {
/* Цикл подсчёта ПОВТОРЕНИЙ КЛЮЧЕВОГО СЛОВА в общем тексте заголовков и превью,
простановка нулей там где результатов нет и перезапись обновленных данных в исходный массив */
  for (let l=0; l<statisticsResults.length; l++) {
    const matchedMentiones = (statisticsResults[l][1]).toString().match(regExpRequest);
    if (matchedMentiones !== null) {
      statisticsResults[l][1] = statisticsResults[l][1].splice(1, 1);
      statisticsResults[l][1] = matchedMentiones.length;
    } else {
      statisticsResults[l][1] = statisticsResults[l][1].splice(1, 1);
      statisticsResults[l][1] = 0;
    }
  }
  return statisticsResults;
}

export function createDates ()  {
  const createdDates = [];
// цикл для получения массива ВЫБОРОЧНО РАНЖИРОВАННОГО по дате публикации
  for (let g=0; g < statisticsUpgradedResults.length; g++) {
    const pubdate = statisticsUpgradedResults[g][0];
    const m = statisticsUpgradedResults[g][1];
    if (m === 1 || m === 0) {
      createdDates.push(pubdate);
    } else {
      const times=(n,f)=>{while(n-->0)f();}
      times(m,()=>createdDates.push(pubdate));
    }
  }
  return createdDates;
}

export function createEmptyLastWeekArray () {
  const startDate = sevenDaysAgo.toJSON().slice(0,10);
  const todayCD = currentDate.toJSON().slice(0,10);
  const dateMove = new Date(startDate);
  let oldDate = startDate;
  while (oldDate < todayCD){
    oldDate = dateMove.toISOString().slice(0,10);
    zeroCalibrationArray.push(oldDate);
    dateMove.setDate(dateMove.getDate()+1);
  }
  return zeroCalibrationArray;
}

export function correctionDistortionsAmmount () {
  for(let i = 0; i < daily.length; ++i) {
    daily[i] -= 1; //корректирую все данные до реальных значений
  }
  return daily;
} // передалть под forEach
