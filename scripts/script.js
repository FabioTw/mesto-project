import * as card from './components/card.js'
import * as utils from './components/utils.js'
import * as modal from './components/modal.js'
import * as validate from './components/validate.js'
import * as variables from './components/variables.js'

validate.enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 