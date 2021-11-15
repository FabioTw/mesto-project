import {switchPopup} from './utils.js';
import {data} from '../script.js';
import {profileDescription, profileName, popupProfileInputName, popupProfileInputDescription, elements, popupAddElement, popupAddElementInputName, 
  popupAddElementInputDescription , element, popupProfile, popupPhoto, popupEditAvatar, avatarImage, popupEditAvatarInputUrl} from './variables.js';
import {createStandartElements} from './card.js';

popupProfileInputName.value = profileName.textContent;
popupProfileInputDescription.value = profileDescription.textContent;

function editProfilePopup() {
  switchPopup(popupProfile);
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputDescription.value = profileDescription.textContent;
}

function addElement (event) {
  event.preventDefault();
  if (!(event.target.closest('.popup__button_disabled'))) {
    elements.insertBefore(createStandartElements(popupAddElementInputName.value, popupAddElementInputDescription.value), element);
    switchPopup(popupAddElement);
    resetPopupFields (popupAddElementInputName, popupAddElementInputDescription);
  };
}

function addElementPopup(evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    switchPopup(popupAddElement);
  };
  innactiveButton(evt.target.closest(data.submitButtonSelector));
}

function editProfileSubmitButton (event) {
  event.preventDefault(); 
  if (!(event.target.closest('.popup__button_disabled'))) {
    profileName.textContent = popupProfileInputName.value;
    profileDescription.textContent = popupProfileInputDescription.value;
    switchPopup(popupProfile);
  };
}

function closePopupPhoto(evt) {
  if (!(evt.target.closest('.popup__picture-img'))) {
  switchPopup(popupPhoto);
  };
}

function resetPopupFields (field1, field2) {
  field1.value = '';
  field2.value = '';
}

function closePopupProfile (evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    switchPopup(popupProfile);
  };
}

function openAvatarPopup (evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    switchPopup(popupEditAvatar);
  };
  innactiveButton(evt.target.closest(data.submitButtonSelector));
}

function submitAvatar (evt) {
  evt.preventDefault(); 
  if (!(evt.target.closest('.popup__button_disabled'))) {
    avatarImage.src = popupEditAvatarInputUrl.value;
    switchPopup(popupEditAvatar);
    resetPopupFields(popupEditAvatarInputUrl, popupEditAvatarInputUrl);
  };
}

function innactiveButton (button) {
  button.classList.add(data.inactiveButtonClass);
}

export {editProfilePopup, addElement, addElementPopup, editProfileSubmitButton, closePopupPhoto, closePopupProfile, openAvatarPopup, submitAvatar};