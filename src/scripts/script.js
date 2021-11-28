import './../pages/index.css';
import * as card from './components/card.js'
import * as utils from './components/utils.js'
import * as modal from './components/modal.js'
import * as validate from './components/validate.js'
import * as variables from './components/variables.js'
import * as api from './components/api.js'


export const data = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

validate.enableValidation(data); 

