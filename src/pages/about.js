import "./about.css";
import Glide from '@glidejs/glide';
import {glideConfig} from '../js/glide-config.js';

import {GithubApi} from '../js/github-api.js';
import {Slide} from '../blocks/slider/__card/slide.js';
import {SlidesList} from '../blocks/slider/__slides/slides-list.js';

export const githubApi = new GithubApi ({
  baseUrl: 'https://api.github.com/repos/DmJavaScript/YandexDiplomaProject/commits',
  headers: {
    authorization: 'ca68fe15b70347d75428771071b8dfe19e1a8ba5',
    'Content-Type': 'application/json'
  }
});
export const createSlide = (...args) => new Slide (...args);
export const slidesList = new SlidesList ();
export const glide = new Glide (glideConfig.container, glideConfig.settings);

githubApi.getSlidesData()
          .then(data => slidesList.render(data))
          .catch((err) => console.log('Ошибка. Запрос не выполнен: ', err));
