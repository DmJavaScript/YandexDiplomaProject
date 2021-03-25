import {slidesContainer, bulletsContainer} from '../../../js/constants.js';
import {glide, createSlide} from '../../../pages/about.js';
import {formatDate} from '../../../js/utils.js';

export class SlidesList {
  constructor() {
    this._slidesContainer = slidesContainer;
    this._bulletsContainer = bulletsContainer;
  }

  render(data) { //метод для автоматической отрисовки слайдов из списка коммитов
    data.forEach((e, i) => {
      const currentNum =  `=` + `${i}`;
      this._addSlide(formatDate(data[i].commit.author.date), data[i].author.avatar_url, data[i].commit.author.name, data[i].commit.author.email, data[i].commit.message, currentNum);
    });
    glide.mount ();
  }

  _addSlide(...args) { //метод для добавления слайда в набор слайдов
    const slide = createSlide (...args);
    slide.render();
    this._slidesContainer.appendChild(slide.slideElement);
    this._bulletsContainer.appendChild(slide.bulletElement);
  }

}