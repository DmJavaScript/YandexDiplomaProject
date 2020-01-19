import "./index.css";
export {currentDate, fullDaysPassed, gapSixDaysInMS, dateWithoutUTC, sevenDaysAgo, fromDate, today, regExpHTTPLinkFirst, buttonSearch, input, lostedPicturesReplacement} from '../js/constants.js';

import {Validation} from '../js/validation.js';
import {Card} from '../blocks/cards/__cell/card.js';
import {CardsList} from '../blocks/cards/cards_list.js';
import {StorageData} from '../js/storage_data.js';
import {NewsApi} from '../js/news_api.js';
import {NewServerData} from '../js/new_server_data.js';

export const cardArguments = (...args) => new Card (...args);
export const storageData = new StorageData();
export const cardsList = new CardsList(cardArguments);
export const newsApi = new NewsApi();

new Validation();
new NewServerData();

storageData.chekingStorage();
