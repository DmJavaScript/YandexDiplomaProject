import "./index.css";
import {storageData} from '../js/constants.js';
import {Validation} from '../js/validation.js';
import {NewServerData} from '../js/new_server_data.js';
new Validation();
new NewServerData();

storageData.chekingStorage();
