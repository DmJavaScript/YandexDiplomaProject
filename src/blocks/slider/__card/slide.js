export class Slide {
  constructor(date, avatar, name, email, message, currentNum) {
    this._date = date;
    this._avatar = avatar;
    this._name = name;
    this._email = email;
    this._message = message;
    this._currentNum = currentNum;
    // this.slideElement = this._createSlide();
    // this.bulletElement = this._createSlideBullet();
  }

  render() {
    this.slideElement = this._createSlide();
    this.bulletElement = this._createSlideBullet();
  }

  _createSlide() {
    const slideContainer = document.createElement('article');
    const dateElement = document.createElement('p');
    const profileContainer = document.createElement('div');
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

    dateElement.textContent = this._date;
    photoElement.setAttribute('src', this._avatar);
    nameElement.textContent = this._name;
    emailElement.textContent = this._email;
    messageElement.textContent = this._message;

    //родительство и рендер
    slideContainer.appendChild(dateElement);
    slideContainer.appendChild(profileContainer);
    profileContainer.appendChild(photoElement);
    profileContainer.appendChild(nameElement);
    profileContainer.appendChild(emailElement);
    slideContainer.appendChild(messageElement);

    return slideContainer;
  }

  _createSlideBullet() {
    const bulletElement = document.createElement('button');
    bulletElement.classList.add('slider__bullet');
    bulletElement.classList.add('glide__bullet');
    bulletElement.setAttribute('data-glide-dir', this._currentNum);

    //рендер
    return bulletElement;
  }
}