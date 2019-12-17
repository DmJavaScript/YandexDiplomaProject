import "./index.css";

// Просьба проверять только HTML код, я не хочу терять попытку и у меня только наброски к нему!
//______________________________________________________________________________________________

// const searchButton = document.querySelector('#start-search');
// const error = document.querySelector('#search-input-error');



// searchButton.disabled = true; // надо отключить кнопку когда в форму поставлен курсор


/*


const inputForm = document.querySelector('#form-search');
inputForm.addEventListener('input', validate(searchInput.value));



function customValidation {
  this.invalidities = [];

}

CustomValidation.prototype = {
  addInvalidity: function(message) {
    this.invalidities.push(message);
  },
  getInvalidities: function() {
    return this.invalidities.join('. \n');
  },
  checkValidity: function (input) {


    if (input.value.lenght < 3) {
      this.addInvalidity('Длинна может быть от 3 до 30 символов');
      let element =
      element.classList.add('invalid');
      element.classList.remove('valid');

    } else {
      let element = document.querySelector('label[for="username"] .input-requirements li:nth-child(1)')
      element.classList.remove('invalid');
      element.classList.add('valid');
    }


    if (input.value.match(/([a-яёА-ЯЁ0-9\-\S]*)?/gi) ) {
      this.addInvalidity('Только буквы и цифры допустимы');
      element.classList.add('invalid');
      element.classList.remove('valid');

    }  else {
      let element = document.querySelector('label[for="username"] .input-requirements li:nth-child(1)')
      element.classList.remove('invalid');
      element.classList.add('valid');
    }

  }
};


const searchInput = document.querySelector('#search-input');

searchInput.CustomValidation = new CustomValidation();
searchInput.addEventListener('keyup', function() {
  searchInput.CustomValidation.checkValidity(this)
}


const usernameValidityChecks = [
  {
		isInvalid: function(input) {
			return input.value.length < 3;
		},
		invalidityMessage: 'Должно быть от 3 до 30 символов',
		element: document.querySelector('label[for="username"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			var illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Только буквы и цифры допустимы',
		element: document.querySelector('label[for="username"] .input-requirements li:nth-child(2)')
	}
];

*/
/*

function validate () {
  if (!searchInput.checkValidity()) {
    setupValidationMessages (searchInput);
    error.classList.remove('header__error-message_hidden');
    error.textContent = searchInput.validationMessage;
    searchInput.parentNode.classList.add('input-container__invalid');
    return false;
  }
  // searchButton.disabled = false; //включаю кнопку когда форма запроса заполнена правильно
}



function setupValidationMessages () {;
  if (searchInput.validity.valueMissing) {
    searchInput.setCustomValidity('Нужно ввести ключевое слово');
  }
  if (!searchInput.validity.valueMissing) {
  searchInput.setCustomValidity('');
  }
  if (searchInput.validity.rangeUnderflow) {
    searchInput.setCustomValidity('Должно быть от 3 до 30 символов');
  }
  if (searchInput.validity.typeMismatch) {
    searchInput.setCustomValidity('Здесь должен быть введён текст!');
  }
  if (searchInput.validity.patternMismatch ) {
    searchInput.setCustomValidity('Не более одного слова в запросе!');
  }
}

*/

// function readyButton () {
//   .disabled = true;
//   if (inputRequest.setupValidationMessages () === true) {
//     document.querySelector('#start-search').disabled = false;
//   }
//   console.log('zzzzz');
// }



/*
const inputRequest = document.querySelector('#search-input');

class RequestValidation {
  constructor(inputRequest) {
    this.search = inputRequest;
    this.error = document.querySelector('#search-input-error') ;
    this.buttonElement
      .querySelector('#start-search')
      .addEventListener('submit', validate());
  }

  validate () {
    this.buttonElement.disabled = true;
    if (!this.search.checkValidity()) {
      this.search.event.preventDefault();
      setupValidationMessages (this.search);
      this.error.textContent = this.search.validationMessage;
      this.search.parentNode.classList.add('input-container__invalid');
      this.error.classList.remove('header__error-message_hidden');
      return false;
    }
    this.buttonElement.disabled = false;
  }

  setupValidationMessages () {
    if (this.search.validity.valueMissing) {
      this.search.setCustomValidity('Нужно ввести ключевое слово');
    }
    else if (this.search.validity.tooShort) {
      this.search.setCustomValidity('Должно быть от 3 до 30 символов');
    }
    else if (this.search.validity.typeMismatch) {
      this.search.setCustomValidity('Здесь должен быть введён текст!');
    }
    else if (this.earch.validity.patternMismatch ) {
      this.search.setCustomValidity('Не более одного слова в запросе!');
    }

    console.log(this.request.validity);
  }

  removeValidation () {
    event.target.parentNode.classList.remove('input-container__invalid');

    return this.search;
  }
}


const requestValidation = new RequestValidation (inputRequest);

*/

// searchButton.addEventListener('submit', finalFieldCheck);



// .error-message {
//   opacity: 0;
//


















//Выше валидация

/*


const gapDurationInMS = 604800000; // количество милисекунд за 7 дней от текущей даты
const date = new Date(Date.now() - gapDurationInMS); // вычитаем количество милисекунд за интересуемый промежуток времени
const cd = new Date();



// const fromDate = 'from=' + date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-'+ ('0' + date.getDate()).slice(-2);
// const currentDate = 'to=' + cd.getFullYear() + '-' + ('0' + (cd.getMonth() + 1)).slice(-2) + '-'+ ('0' + cd.getDate() - 7).slice(-2);

const fromDate = 'from=' + date.toJSON().slice(0, 10);
const currentDate = 'to=' + cd.toJSON().slice(0, 10);



console.log(date, fromDate);
console.log(cd, currentDate);




inputRequest = 'природа';

class Api {
  // constructor(options) {
  //   this.options = options;
  // }

  getNews () {
    return fetch('https://newsapi.org/v2/everything?q=' + `${inputRequest}` + '&pageSize=100&' + `${fromDate}` + '&' + `${currentDate}`+ '&apiKey=a77a12e2e4484b4fb5cc12d192f94b00', {
      method: 'GET'
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    // .then((data) => {
    //   console.log(data, data.articles[3].urlToImage, data.articles[3].publishedAt, data.articles[3].title, data.articles[3].description, data.articles[3].source.name);
    // })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    })
  }
}

const api = new Api();
api.getNews().then((data) => console.log(data, data.articles[3].urlToImage, data.articles[3].publishedAt, data.articles[3].title, data.articles[3].description, data.articles[3].source.name));


// const rawDate = new Date(data.articles[3].publishedAt);

const cardYear = {year: 'numeric'};
const cardDayMonth = {day: 'numeric', month: 'long'};
const cardsDate = cd.toLocaleDateString('ru-RU', cardDayMonth) + ', ' + cd.toLocaleDateString('ru-RU', cardYear);
console.log(cardsDate);

// const now = new Date();
// const articlePublishedAt = now.format(dd mm, yyyy);
// console.log(articlePublishedAt);


//_______________________________________

const cards = document.querySelector('.cards');

class Card constructor (container, urlToImage, publishedAt, title, description, name) {
  this.container = container;
  this.urlToImage = urlToImage;
  this.publishedAt = publishedAt;
  this.title = title;
  this.description = description;
  this.name = name;
  this.cardElement = this.createCard();
  this.renderCards();
}

createCard() {
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

renderCards() { //метод для автоматической отрисовки карточек из списка addCard
  this.data.forEach(({date, avatar, name, email, message}) => this.addCard(date, avatar, name, email, message))
}
}

*/

// pattern='([А-яё0-9\-\S]*)?' - из HTML