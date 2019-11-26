import "./about.css";

/*
const initialCards = [];

class GithubApi {
    constructor(options) {
      this.options = options;
    }

    getUserData () {
      return fetch(`${this.options.baseUrl}/develop`, {
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
}


const api = new GithubApi({
    baseUrl: 'https://api.github.com/repos/DmJavaScript/YandexDiplomaProject/commits/',
    headers: {
      authorization: '2be5a16d-b37d-40f5-token-here850a-90e709aeb96d',
      'Content-Type': 'application/json'
    }
});


class User {
  constructor(date, avatar, name, email, message) {
      this.date = date;
      this.avatar = avatar;
      this.name = name;
      this.email = email;
      this.message = message;
      this.createUser();
  }

  createUser() {
      const userInfoDateElement = document.createElement('p');
      const userInfoPhotoElement = document.createElement('img');
      const userInfoNameElement = document.createElement('h3');
      const userInfoEmailElement = document.createElement('p');
      const userInfoMessageElement = document.createElement('p');

      userInfoDateElement.classList.add('slider__date');
      userInfoPhotoElement.classList.add('slider__photo');
      userInfoNameElement.classList.add('slider__name');
      userInfoEmailElement.classList.add('slider__email');
      userInfoMessageElement.classList.add('slider__quote');

      userInfoDateElement.textContent = this.date;
      userInfoPhotoElement.style.backgroundImage = 'url(' + this.avatar + ')'; // ! переработать команду, тут картинка ставляется напрямую в html
      userInfoNameElement.textContent = this.name;
      userInfoEmailElement.textContent = this.email;
      userInfoMessageElement.textContent = this.message;

      //родительство и рендер------- d ghjwtcct
      document.querySelector('.slider__card').insertBefore(userInfoDateElement, document.querySelector('.slider__date'));
      document.querySelector('.user-info__data').insertBefore(userInfoNameElement, document.querySelector('.user-info__button-edit'));
      document.querySelector('.user-info__data').insertBefore(userInfoJobElement, document.querySelector('.user-info__button-edit'));
  }
}


api.getUserData().then(data => new User(data.commit.commiter.name, data.commit.commiter.email, data.commit.commiter.date, data.commit.message, data.author.avatar_url));
*/
//После того как убежусь, что работает, переименовать класс User.
//______________________________________________________________________
