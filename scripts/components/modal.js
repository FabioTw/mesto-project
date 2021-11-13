import {switchPopup} from './utils.js'
import {profileDescription, profileName, popupProfileInputName, popupProfileInputDescription, elements, popupAddElement, popupAddElementInputName, popupAddElementInputDescription , element, popupProfile, popupPhoto} from './variables.js'
import {createStandartElements} from './card.js'

popupProfileInputName.value = profileName.textContent;
popupProfileInputDescription.value = profileDescription.textContent;

function editProfilePopup() {
  switchPopup(popupProfile);
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputDescription.value = profileDescription.textContent;
}

function addElement (event) {
  event.preventDefault();
  elements.insertBefore(createStandartElements(popupAddElementInputName.value, popupAddElementInputDescription.value), element);
  switchPopup(popupAddElement);
  resetPopupFields (popupAddElementInputName, popupAddElementInputDescription);
}

function addElementPopup(evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    switchPopup(popupAddElement);
    }
}

function editProfileSubmitButton (event) {
  event.preventDefault(); 
  profileName.textContent = popupProfileInputName.value;
  profileDescription.textContent = popupProfileInputDescription.value;
  switchPopup(popupProfile);
}

function closePopupPhoto(evt) {
  if (!(evt.target.closest('.popup__picture-img'))) {
  switchPopup(popupPhoto);
  }
}

function resetPopupFields (field1, field2) {
  field1.value = '';
  field2.value = '';
}

function closePopupProfile (evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    switchPopup(popupProfile)
  }
}

export {editProfilePopup, addElement, addElementPopup, editProfileSubmitButton, closePopupPhoto, closePopupProfile}