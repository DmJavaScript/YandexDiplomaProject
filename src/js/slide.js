export class Slide {
  constructor(date, avatar, name, email, message, currentNum) {
    this._date = date;
    this._avatar = avatar;
    this._name = name;
    this._email = email;
    this._message = message;
    this._currentNum = currentNum;
    this.slideElement = this.createSlide()
    this.bulletElement = this.createSlideBullet();
  }

  createSlide() {
    const _slideContainer = document.createElement('article');
    const _dateElement = document.createElement('p');
    const _profileContainer = document.createElement('div');
    const _photoElement = document.createElement('img');
    const _nameElement = document.createElement('h3');
    const _emailElement = document.createElement('p');
    const _messageElement = document.createElement('p');

    _slideContainer.classList.add('slider__card');
    _slideContainer.classList.add('glide__slide');
    _dateElement.classList.add('slider__date');
    _profileContainer.classList.add('slider__commentator');
    _photoElement.classList.add('slider__photo');
    _nameElement.classList.add('slider__name');
    _emailElement.classList.add('slider__email');
    _messageElement.classList.add('slider__quote');

    _dateElement.textContent = this._date;
    _photoElement.setAttribute('src', this._avatar);
    _nameElement.textContent = this._name;
    _emailElement.textContent = this._email;
    _messageElement.textContent = this._message;

    //родительство и рендер
    _slideContainer.appendChild(_dateElement);
    _slideContainer.appendChild(_profileContainer);
    _profileContainer.appendChild(_photoElement);
    _profileContainer.appendChild(_nameElement);
    _profileContainer.appendChild(_emailElement);
    _slideContainer.appendChild(_messageElement);

    return _slideContainer;
  }

  createSlideBullet() {
    this._bulletElement = document.createElement('button');

    this._bulletElement.classList.add('slider__bullet');
    this._bulletElement.classList.add('glide__bullet');

    console.log(this._currentNum);
    this._bulletElement.setAttribute('data-glide-dir', this._currentNum);

    //рендер
    return this._bulletElement;
  }
}