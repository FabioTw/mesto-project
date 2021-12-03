import './../pages/index.css';
import * as card from './card.js'
import * as utils from './utils.js'
import * as modal from './modal.js'
import * as validate from './validate.js'
import * as variables from './variables.js'
import * as api from './api.js'


export const data = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

validate.enableValidation(data); 

api.getProfile()
.then((result) => {
  setNetProfile(result);
})
.catch ((err) => {
  console.log(err)
}); 

function setNetProfile(res) {
  variables.profileName.textContent = res.name;
  variables.profileDescription.textContent = res.about;
  variables.avatarImage.src = res.avatar;
}

