//страница details.js
import {recivedData, regExpRequest, detailsPageData, detailsPageDataNew, createdDates, cd, date, zeroCalibrationArray, daily} from "./costants.js";

//Сужение всех заголовков до строки и подсчёт количества совпадений
export function titleRepitsNumber () {
  const titlesArray = recivedData.map(storageString => [storageString.title]);
  return JSON.stringify(titlesArray).match(regExpRequest).length;
}

export function textDataToNumbersInArray () {
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
  return detailsPageData;
}

export function createDates ()  {
  let createdDates = [];
// цикл для получения массива ВЫБОРОЧНО РАНЖИРОВАННОГО по дате публикации
  for (let g=0; g < detailsPageDataNew.length; g++) {
    const pubdate = detailsPageDataNew[g][0];
    const m = detailsPageDataNew[g][1];
    if (m === 1 || m === 0) {
      createdDates.push(pubdate);
    } else {
      let times=(n,f)=>{while(n-->0)f();}
      times(m,()=>createdDates.push(pubdate));
    }
  }
  return createdDates;
}

export function createEmptyLastWeekArray () {
  const startDate = date.toJSON().slice(0,10);
  const todayCD = cd.toJSON().slice(0,10);
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
}