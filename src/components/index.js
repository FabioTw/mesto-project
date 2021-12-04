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

let myProfileId

api.getProfile()
.then((result) => {
  setNetProfile(result);
  validate.enableValidation(data); 
  console.log(data)
})
.catch ((err) => {
  console.log(err)
}); 

function setNetProfile(res) {
  variables.profileName.textContent = res.name;
  variables.profileDescription.textContent = res.about;
  variables.avatarImage.src = res.avatar;
  myProfileId = String(res._id);
  data.id = myProfileId
}