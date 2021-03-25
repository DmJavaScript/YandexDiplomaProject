import "./index.css";
export {regExpHTTPLinkFirst, searchSection, input, buttonSearch} from '../js/constants.js';

import {Validation} from '../js/validation.js';
import {Card} from '../blocks/cards/__cell/card.js';
import {CardsList} from '../blocks/cards/cards-list.js';
import {StorageData} from '../js/storage-data.js';
import {NewServerData} from '../js/new-server-data.js';

export const cardArguments = (...args) => new Card (...args);
export const cardsList = new CardsList (cardArguments);
export const storageData = new StorageData (cardsList);

new Validation ();
new NewServerData();

storageData.chekingStorage();
