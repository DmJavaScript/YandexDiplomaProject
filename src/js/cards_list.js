export class CardsList {
  constructor(cardArguments) {
    this._cardsContainer = document.querySelector('.cards');
    this._cardArguments = cardArguments;
    this._fromCardPosition = 0;
    this._openPerOnce = 3;
    this._openMoreCards = this._openMoreCards.bind(this);
    this._buttonOpenMore = document.querySelector('.search__button-open-more');

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
    const _card = this._cardArguments(...args);
    this._cardsContainer.appendChild(_card.createCard());
  }

  _render(resultsArray) { //метод для автоматической отрисовки карточек из списка addCard
    console.log('megasuper', resultsArray);
    resultsArray.forEach((resultsArray) => this._addCard(resultsArray[0], resultsArray[1], resultsArray[2], resultsArray[3], resultsArray[4], resultsArray[5], resultsArray[6]));
  }

  _openMoreCards() {
    this._buttonOpenMore.classList.remove('search__button-open-more_display-none');
    const _cardsNotDisplayed = Array.from(document.querySelectorAll('.cards__cell_dispay-none')); //тут список карточек меняется поэтому при каждом вызове функции нужен новый список - обновление списка элементов.
    _cardsNotDisplayed.slice(this._fromCardPosition, this._openPerOnce).forEach((_cardsNotDisplayed) => _cardsNotDisplayed.classList.remove('cards__cell_dispay-none'));
    if (_cardsNotDisplayed.length <= this._openPerOnce) {
      this._buttonOpenMore.classList.add('search__button-open-more_display-none');
    }
  }

}