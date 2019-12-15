import "./about.css";
import Glide from '@glidejs/glide';

// Просьба проверять только HTML код, я не хочу терять попытку и у меня только наброски к нему!

const glide = new Glide('#options-focus-at', {
  type: 'slider',
  bound: 'false',
  gap: 16,
  startAt: 2,
  perView: 3,
  peek: 105,
  focusAt: 'center',
  perTouch: 'unlimited',
  breakpoints: {
    1280: {
      perView: 2.7,
      peek: 85,
      focusAt: 'center',
    },
    1125: {
      perView: 2.40,
      peek: 73,
      focusAt: 0,
    },
    1080: {
      perView: 2.35,
      peek: 73,
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
      gap: 8,
      startAt: 0,
      perView: 2.6,
      peek: 0,
      focusAt: 0,
    },
    768: {
      perView: 2.23,
      peek: 0,
      focusAt: 0,
    },
    750: {
      perView: 2.18,
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
});

glide.mount();




/*
class GithubApi {
  constructor(options) {
    this.options = options;
  }

  getSlideData () {
    return fetch(`${this.options.baseUrl}develop`, {
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

const api = new GithubApi({
    baseUrl: 'https://api.github.com/repos/DmJavaScript/YandexDiplomaProject/commits/',
    headers: {
      authorization: 'ca68fe15b70347d75428771071b8dfe19e1a8ba5',
      'Content-Type': 'application/json'
    }
});

const slider = document.querySelector('.slider');

class Slide {
  constructor(container, date, avatar, name, email, message) {
    this.container = container;
    this.date = date;
    this.avatar = avatar;
    this.name = name;
    this.email = email;
    this.message = message;
    this.cardElement = this.createSlide();
    this.renderSlides();
  }

  createSlide() {
    const slideInfoContainer =  document.createElement('article');
    const slideInfoDateElement = document.createElement('p');
    const slideInfoProfileContainer =  document.createElement('div');
    const slideInfoPhotoElement = document.createElement('img');
    const slideInfoNameElement = document.createElement('h3');
    const slideInfoEmailElement = document.createElement('p');
    const slideInfoMessageElement = document.createElement('p');

    slideInfoContainer.classList.add('slider__card');
    slideInfoDateElement.classList.add('slider__date');
    slideInfoProfileContainer.classList.add('slider__commentator');
    slideInfoPhotoElement.classList.add('slider__photo');
    slideInfoNameElement.classList.add('slider__name');
    slideInfoEmailElement.classList.add('slider__email');
    slideInfoMessageElement.classList.add('slider__quote');

    slideInfoDateElement.textContent = this.date;
    slideInfoPhotoElement.setAttribute('src', this.avatar);
    slideInfoNameElement.textContent = this.name;
    slideInfoEmailElement.textContent = this.email;
    slideInfoMessageElement.textContent = this.message;

    //родительство и рендер
    slideInfoContainer.appendChild(slideInfoDateElement);
    slideInfoContainer.appendChild(slideInfoProfileContainer);
    slideInfoProfileContainer.appendChild(slideInfoPhotoElement);
    slideInfoProfileContainer.appendChild(slideInfoNameElement);
    slideInfoProfileContainer.appendChild(slideInfoEmailElement);
    slideInfoContainer.appendChild(slideInfoMessageElement);

    return (slideInfoContainer);
  }

  addCard(date, avatar, name, email, message) { //метод для добавления карточки в список
    const{cardElement} = new CreateSlide(date, avatar, name, email, message);
    this.container.appendChild(cardElement);
  }

  renderSlides() { //метод для автоматической отрисовки карточек из списка addCard
    this.data.forEach(({date, avatar, name, email, message}) => this.addCard(date, avatar, name, email, message))
  }
}


api.getSlideData().then(data => new Slide(slider, data.commit.committer.date, data.author.avatar_url, data.commit.committer.name, data.commit.committer.email, data.commit.message));

function formatDate(data.commit.committer.date){
  return date.toLocaleString("ru", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit"
  });
}
var date = new Date(2014, 0, 30); //30.01.14
console.log(formatDate(date));

api.getSlideData().then(data => formatDate(data.commit.committer.date));

*/