import {lostedPicturesReplacement} from './constants.js';
import {getRandomInt} from './utils.js';

export class Card {
    constructor (date, link, urlToImage, publishedAt, title, description, name) {
    this._date = date;
    this._link = link;
    this._imageReplacement = lostedPicturesReplacement[getRandomInt(lostedPicturesReplacement.length)];
    this._image = urlToImage;
    this._publishedAt = publishedAt;
    this._title = title;
    this._description = description;
    this._name = name;
  }

  createCard() {
    const _cardContainer =  document.createElement('article');
    const _linkElement = document.createElement('a');
    const _imageElement = document.createElement('img');
    const _dateElement = document.createElement('p');
    const _timeElement = document.createElement('time');
    const _articleContainer =  document.createElement('div');
    const _headingElement = document.createElement('h4');
    const _descriptionElement = document.createElement('p');
    const _bottomHideArtefacts = document.createElement('div');
    const _nameSourceElement = document.createElement('p');

    _cardContainer.classList.add('cards__cell');
    _cardContainer.classList.add('cards__cell_dispay-none');
    _linkElement.classList.add('cards__cell-link');
    _imageElement.classList.add('cards__cell-image');
    _dateElement.classList.add('cards__cell-date');
    _articleContainer.classList.add('cards__article-container');
    _headingElement.classList.add('cards__cell-heading');
    _descriptionElement.classList.add('cards__cell-text');
    _bottomHideArtefacts.classList.add('cards__cell-bottom-hide');
    _nameSourceElement.classList.add('cards__cell-news-source');

    _linkElement.setAttribute('href', this._link);
    _linkElement.setAttribute('target', '_blank');
    _imageElement.setAttribute('src', this._image);
    _imageElement.addEventListener('error', () => _imageElement.setAttribute('src', this._imageReplacement));
    _imageElement.setAttribute('alt', 'картинка к новости');
    _dateElement.setAttribute('itemscope', '');
    _timeElement.setAttribute('itemprop', 'pubdate');
    _timeElement.setAttribute('datetime', this._date.slice(0, 10));
    _timeElement.textContent = this._publishedAt;
    _headingElement.textContent = this._title;
    _descriptionElement.textContent = this._description;
    _nameSourceElement.textContent = this._name;

    //родительство и рендер
    _cardContainer.appendChild(_linkElement);
    _cardContainer.appendChild(_imageElement);
    _cardContainer.appendChild(_dateElement);
    _dateElement.appendChild(_timeElement);
    _cardContainer.appendChild(_articleContainer);
    _articleContainer.appendChild(_headingElement);
    _articleContainer.appendChild(_descriptionElement);
    _cardContainer.appendChild(_bottomHideArtefacts);
    _cardContainer.appendChild(_nameSourceElement);

    return _cardContainer;
  }
}
