import {createSlide, glideConfig, glide} from '../../../pages/about.js';
import {formatDate} from '../../../js/utils.js';

export class SlidesList {
  constructor() {
    this._slidesContainer = document.querySelector('.slider__slides');
    this._bulletsContainer = document.querySelector('.slider__bullets');
    this._createSlide = createSlide;
    this._currentNum = '';
  }

  _addCard(...args) { //метод для добавления карточки в список карточек
    const slide = this._createSlide (...args);
    this._slidesContainer.appendChild(slide.slideElement);
    this._bulletsContainer.appendChild(slide.bulletElement);
  }

  render(data) { //метод для автоматической отрисовки карточек из списка addCard
    data.forEach((e, i) => {
      this._currentNum =  `=` + `${i}`;
      this._addCard(formatDate(data[i].commit.author.date), data[i].author.avatar_url, data[i].commit.author.name, data[i].commit.author.email, data[i].commit.message, this._currentNum);
    });
    glide.mount();
  }

}