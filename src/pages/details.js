import "./details.css";
export {currentDate, sevenDaysAgo, recivedData, recivedDataRequest, regExpRequest} from '../js/constants.js';
import {shortStatistics} from '../blocks/header/short_statistics.js';
import {table} from '../blocks/search-analitics/table.js';

shortStatistics.render();
table.updateData();
