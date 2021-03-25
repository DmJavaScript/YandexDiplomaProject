import {cardsContainer, buttonOpenMore} from '../../js/constants.js';

export class CardsList {
  constructor(cardArguments) {
    this._cardsContainer = cardsContainer;
    this._cardArguments = cardArguments;
    this._fromCardPosition = 0;
    this._openPerOnce = 3;
    this._openMoreCards = this._openMoreCards.bind(this);
    this._buttonOpenMore = buttonOpenMore;

    this._buttonOpenMore.addEventListener('click', this._openMoreCards);

  }

  startMount(resultsArray) {
    this._deleteOldCards();
    this._render(resultsArray);
    this._openMoreCards();
  }

  _deleteOldCards() { //метод удаления старых карточек на странице
    const cards = document.querySelectorAll('.cards__cell');
    cards.forEach((element) => this._cardsContainer.removeChild(element));
  }

  _addCard(...args) { //метод для добавления карточки в список карточек
    const card = this._cardArguments (...args);
    this._cardsContainer.appendChild(card.createCard());
  }

  _render(resultsArray) { //метод для автоматической отрисовки карточек из списка addCard
    resultsArray.forEach((resultsArray) => this._addCard(resultsArray[0], resultsArray[1], resultsArray[2], resultsArray[3], resultsArray[4], resultsArray[5], resultsArray[6]));
  }

  _openMoreCards() {
    this._buttonOpenMore.classList.remove('search__button-open-more_display-none');
    const cardsNotDisplayed = Array.from(document.querySelectorAll('.cards__cell_dispay-none')); //тут список карточек меняется поэтому при каждом вызове функции нужен новый список - обновление списка элементов.
    cardsNotDisplayed.slice(this._fromCardPosition, this._openPerOnce).forEach((cardsNotDisplayed) => cardsNotDisplayed.classList.remove('cards__cell_dispay-none'));
    if (cardsNotDisplayed.length <= this._openPerOnce) {
      this._buttonOpenMore.classList.add('search__button-open-more_display-none');
    }
  }
}