
import {editProfilePopup, addElement, addElementPopup, editProfileSubmitButton, closePopupPhoto, closePopupProfile} from './modal.js'
import {editButton, submitButton, submitAddElementButton, addButton, popupAddElement, popupPhoto, popupProfile} from './variables.js'

editButton.addEventListener('click', editProfilePopup);
submitButton.addEventListener('click', editProfileSubmitButton);
submitAddElementButton.addEventListener('click', addElement);
addButton.addEventListener('click', addElementPopup);
popupAddElement.addEventListener('click', addElementPopup);
popupPhoto.addEventListener('click', closePopupPhoto);
popupProfile.addEventListener('click', closePopupProfile);

function switchPopup(popup) {
  popup.classList.toggle('popup_opened');
}

export {switchPopup}