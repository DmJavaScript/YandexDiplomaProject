import "./about.css";
import {githubApi, slidesList, glide} from '../js/constants.js';

githubApi.getSlidesData()
          .then(data => slidesList.render(data))
          .catch((err) => console.log('Ошибка. Запрос не выполнен: ', err));

glide.mount();
