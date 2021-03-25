import {lostedPicturesReplacement} from '../../../js/constants.js';
import {getRandomInt} from '../../../js/utils.js';

export class Card {
    constructor (date, link, urlToImage, publishedAt, title, description, name) {
    this._date = date;
    this._link = link;
    this._image = urlToImage;
    this._publishedAt = publishedAt;
    this._title = title;
    this._description = description;
    this._name = name;
  }

  createCard() {
    const cardContainer =  document.createElement('article');
    const linkElement = document.createElement('a');
    const imageElement = document.createElement('img');
    const dateElement = document.createElement('p');
    const timeElement = document.createElement('time');
    const articleContainer =  document.createElement('div');
    const headingElement = document.createElement('h4');
    const descriptionElement = document.createElement('p');
    const bottomHideArtefacts = document.createElement('div');
    const nameSourceElement = document.createElement('p');

    cardContainer.classList.add('cards__cell');
    cardContainer.classList.add('cards__cell_dispay-none');
    linkElement.classList.add('cards__cell-link');
    imageElement.classList.add('cards__cell-image');
    dateElement.classList.add('cards__cell-date');
    articleContainer.classList.add('cards__article-container');
    headingElement.classList.add('cards__cell-heading');
    descriptionElement.classList.add('cards__cell-text');
    bottomHideArtefacts.classList.add('cards__cell-bottom-hide');
    nameSourceElement.classList.add('cards__cell-news-source');

    linkElement.setAttribute('href', this._link);
    linkElement.setAttribute('target', '_blank');
    imageElement.setAttribute('src', this._image);
    imageElement.addEventListener('error', () => imageElement.setAttribute('src', lostedPicturesReplacement[getRandomInt(lostedPicturesReplacement.length)]));
    imageElement.setAttribute('alt', 'картинка к новости');
    dateElement.setAttribute('itemscope', '');
    timeElement.setAttribute('itemprop', 'pubdate');
    timeElement.setAttribute('datetime', this._date.slice(0, 10));
    timeElement.textContent = this._publishedAt;
    headingElement.textContent = this._title;
    descriptionElement.textContent = this._description;
    nameSourceElement.textContent = this._name;

    //родительство и рендер
    cardContainer.appendChild(linkElement);
    cardContainer.appendChild(imageElement);
    cardContainer.appendChild(dateElement);
    dateElement.appendChild(timeElement);
    cardContainer.appendChild(articleContainer);
    articleContainer.appendChild(headingElement);
    articleContainer.appendChild(descriptionElement);
    cardContainer.appendChild(bottomHideArtefacts);
    cardContainer.appendChild(nameSourceElement);

    return cardContainer;
  }
}
