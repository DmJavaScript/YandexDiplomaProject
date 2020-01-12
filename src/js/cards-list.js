import {cardArguments} from './constants.js';

export class CardsList {
  constructor(cardArguments) {
    this._cardsContainer = document.querySelector('.cards');
    this._cards = document.querySelectorAll('.cards__cell');
    this._cardArguments = cardArguments;
    this._fromCardPosition = 0;
    this._openPerOnce = 3;

    this._buttonOpenMore = document.querySelector('.search__button-open-more');

    this._buttonOpenMore.addEventListener('click', this._openMoreCards.bind(this));
  }

  startMount() {
    this._deleteOldCards();
    this._render();
    this._openMoreCards();
  }

  _deleteOldCards() { //метод удаления старых карточек на странице
    this._cards.forEach((element) => this._cardsContainer.removeChild(element));
  }

  _addCard(...args) { //метод для добавления карточки в список карточек
    const _card = this._cardArguments(...args);
    this._cardsContainer.appendChild(_card.createCard());
  }

  _render() { //метод для автоматической отрисовки карточек из списка addCard
    resultsArray.forEach((resultsArray) => this._addCard(resultsArray[0], resultsArray[1], resultsArray[2], resultsArray[3], resultsArray[4], resultsArray[5], resultsArray[6]));
  }

  _openMoreCards() {
    this._buttonOpenMore.classList.remove('search__button-open-more_display-none');
    const _cardsNotDisplayed = Array.from(document.querySelectorAll('.cards__cell_dispay-none')); //тут список карточек меняется поэтому при каждом вызове функции нужен новый список - обновление списка элементов.
    _cardsNotDisplayed.slice(this._fromCardPosition, this._openPerOnce).forEach((_cardsNotDisplayed) => _cardsNotDisplayed.classList.remove('cards__cell_dispay-none'));
    if (_cardsNotDisplayed.length < this._openPerOnce) {
      this._buttonOpenMore.classList.add('search__button-open-more_display-none');
      this._buttonOpenMore.removeEventListener('click', this._openMoreCards);
    }
  }
}