import "./details.css";
export {currentDate, sevenDaysAgo, recivedData, recivedDataRequest, regExpRequest} from '../js/constants.js';
import {ShortStatistics} from '../blocks/header/short_statistics.js';
import {Table} from '../blocks/search-analitics/table.js';
export const shortStatistics = new ShortStatistics;
export const table = new Table;

shortStatistics.render();
table.updateData();
