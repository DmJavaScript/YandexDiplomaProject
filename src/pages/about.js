import "./about.css";
import Glide from '@glidejs/glide';
import {formatDate} from '../js/utils.js';


class GithubApi {
  constructor(options) {
    this.options = options;
  }

  getSlidesData () {
    return fetch(`${this.options.baseUrl}`, {
      headers: this.options.headers,
      method: 'GET'
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    })
  }
}

const githubApi = new GithubApi({
    baseUrl: 'https://api.github.com/repos/DmJavaScript/YandexDiplomaProject/commits',
    headers: {
      authorization: 'ca68fe15b70347d75428771071b8dfe19e1a8ba5',
      'Content-Type': 'application/json'
    }
});



// // Сохраняю полученный ответ в локальное хранилище
// const localStorageName = "githubApiAnswerLocalStorage";

// function browserStorage (serverData) {
//   const serialObj = JSON.stringify(serverData);
//   localStorage.setItem(localStorageName, serialObj);
// }

// const data = JSON.parse(localStorage.getItem(localStorageName));
// //___________________________________________________________________________


githubApi.getSlidesData()
  .then(data => new SlidesList(data))
  .catch((err) => console.log('Ошибка. Запрос не выполнен: ', err));


class Slide {
  constructor(date, avatar, name, email, message, curentNum) {
    this.date = date;
    this.avatar = avatar;
    this.name = name;
    this.email = email;
    this.message = message;
    this.cardElement = this.createSlide()
    this.bulletElement = this.createSlideBullet();

  }

  createSlide() {
    const slideContainer = document.createElement('article');
    const dateElement = document.createElement('p');
    const profileContainer =  document.createElement('div');
    const photoElement = document.createElement('img');
    const nameElement = document.createElement('h3');
    const emailElement = document.createElement('p');
    const messageElement = document.createElement('p');

    slideContainer.classList.add('slider__card');
    slideContainer.classList.add('glide__slide');
    dateElement.classList.add('slider__date');
    profileContainer.classList.add('slider__commentator');
    photoElement.classList.add('slider__photo');
    nameElement.classList.add('slider__name');
    emailElement.classList.add('slider__email');
    messageElement.classList.add('slider__quote');

    dateElement.textContent = this.date;
    photoElement.setAttribute('src', this.avatar);
    nameElement.textContent = this.name;
    emailElement.textContent = this.email;
    messageElement.textContent = this.message;

    //родительство и рендер
    slideContainer.appendChild(dateElement);
    slideContainer.appendChild(profileContainer);
    profileContainer.appendChild(photoElement);
    profileContainer.appendChild(nameElement);
    profileContainer.appendChild(emailElement);
    slideContainer.appendChild(messageElement);

    return slideContainer;
  }

  createSlideBullet() {
    const bulletElement = document.createElement('button');

    bulletElement.classList.add('slider__bullet');
    bulletElement.classList.add('glide__bullet');

    console.log(curentNum);
    bulletElement.setAttribute('data-glide-dir', curentNum);

    //рендер
    return bulletElement;
  }
}


// function formatDate(data){
//   const cd = new Date(data);
//   return cd.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'}) + ', ' + cd.toLocaleDateString('ru-RU', {year: 'numeric'});
// }
// заменил на универсальную

let curentNum = '';

const createSlide = (...args) => new Slide(...args);

class SlidesList {
  constructor() {
    this.slidesContainer = document.querySelector('.slider__slides');
    this.bulletsContainer = document.querySelector('.slider__bullets');
    this.createSlide = createSlide;
    this.render();
  }

  addCard(...args) { //метод для добавления карточки в список карточек
    const slide = this.createSlide (...args);
    this.slidesContainer.appendChild(slide.cardElement);
    this.bulletsContainer.appendChild(slide.bulletElement);
  }

  render() { //метод для автоматической отрисовки карточек из списка addCard
    for (let i=0; i < data.length; i++) {
      curentNum =  `=` + `${i}`;
      this.addCard(formatDate(data[i].commit.author.date), data[i].author.avatar_url, data[i].commit.author.name, data[i].commit.author.email, data[i].commit.message, curentNum);
    }
  }
}

// const SlidesList = new SlidesList(data);





export const glideConfig = {
  container: '#options-focus-at',
  settings:{
    type: 'slider',
    bound: 'false',
    gap: 16,
    startAt: 2,
    perView: 3,
    peek: 104,
    focusAt: 'center',
    perTouch: 'unlimited',
    breakpoints: {
      1280: {
        perView: 2.7,
        peek: 86,
        focusAt: 'center',
      },
      1125: {
        perView: 2.40,
        peek: 72,
        focusAt: 0,
      },
      1080: {
        perView: 2.275,
        peek: 75,
        focusAt: 0,
      },
      1024: {
        perView: 2.15,
        peek: 73,
        focusAt: 0,
      },
      990: {
        type: 'slider',
        bound: 'true',
        startAt: 0,
        perView: 2.57,
        peek: 0,
        focusAt: 0,
      },
      768: {
        gap: 8,
        perView: 2.257,
        peek: 0,
        focusAt: 0,
      },
      750: {
        perView: 2.19,
        peek: 0,
        focusAt: 0,
      },
      720: {
        perView: 2.10,
        peek: 0,
        focusAt: 0,
      },
      425: {
        perView: 1.28,
        peek: 0,
        focusAt: 0,
      },
      375: {
        perView: 1.14,
        peek: 0,
        focusAt: 0,
      },
      320: {
        gap: 8,
        perView: 1.11,
        peek: 0,
        focusAt: 0,
      },
    }
  }
}

const glide = new Glide(glideConfig.container, glideConfig.settings);

glide.mount();
