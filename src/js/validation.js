import {input, buttonSearch, inputRequirements} from './constants.js';

export class Validation {
  constructor() {
  this._input = input;
  this._buttonSearch = buttonSearch;
  this._inputRequirements = inputRequirements;

  this._input.addEventListener('input', this._finalFieldCheck.bind(this));
  }

  _finalFieldCheck () {
    this._buttonSearch.classList.remove('header__search-button_invalid');
    this._validate ();
  }

  _validate() {
    if (!this._input.checkValidity()) {
      this._customValidationMessages();
      this._inputRequirements.textContent = this._input.validationMessage;
      this._buttonSearch.classList.add('header__search-button_invalid');
      this._buttonSearch.disabled = true;
    } else {
      this._buttonSearch.disabled = false;
      this._inputRequirements.textContent = '';
    }
  }

  _customValidationMessages() {
    if (this._input.validity.valueMissing) {
      this._input.setCustomValidity('Нужно ввести ключевое слово');
    }
    if (this._input.value.length > 1 ) {
      this._input.setCustomValidity('');
    }
  }
}
