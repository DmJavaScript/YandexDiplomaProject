import {input, buttonSearch} from './constants.js';

export class Validation {
  constructor() {
  this._inputRequirements = document.querySelector('.header__input-requirements');
  this._input = input;

  this._input.addEventListener('input', this._finalFieldCheck.bind(this));
  }

  _finalFieldCheck () {
    buttonSearch.classList.remove('header__search-button_invalid');
    this._validate ();
  }

  _validate() {
    if (!this._input.checkValidity()) {
      this._customValidationMessages();
      this._inputRequirements.textContent = this._input.validationMessage;
      buttonSearch.classList.add('header__search-button_invalid');
      buttonSearch.disabled = true;
    } else {
      buttonSearch.disabled = false;
      this._inputRequirements.textContent = '';
    }
  }

  _customValidationMessages() {
    if (this._input.validity.valueMissing) {
      this._input.setCustomValidity("Нужно ввести ключевое слово");
    }
    if (this._input.value.length > 1 ) {
      this._input.setCustomValidity('');
    }
  }
}