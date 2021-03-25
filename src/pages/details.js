import "./details.css";
export {currentDate, sevenDaysAgo, recivedData, recivedDataRequest, regExpRequest, requestTitleElement, newsAmountElement, headerMensionsElement, currentMonthElement, previousMonthElement, timeNodeList, valueNodeList} from '../js/constants.js';
import {shortStatistics} from '../blocks/header/short-statistics.js';
import {table} from '../blocks/search-analitics/table.js';

shortStatistics.render();
table.updateData();
