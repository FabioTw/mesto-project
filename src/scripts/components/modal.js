import {openPopup, closePopup} from './utils.js';
import {data} from '../script.js';
import {profileDescription, profileName, popupProfileInputName, popupProfileInputDescription, elements, popupAddElement, popupAddElementInputName, 
  popupAddElementInputDescription , element, popupProfile, popupPhoto, popupEditAvatar, avatarImage, popupEditAvatarInputUrl} from './variables.js';
import {createStandartElements} from './card.js';

popupProfileInputName.value = profileName.textContent;
popupProfileInputDescription.value = profileDescription.textContent;

function editProfilePopup() {
  openPopup(popupProfile);
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputDescription.value = profileDescription.textContent;
}

function addElement (event) {
  event.preventDefault();
  if (event.target.querySelector('.popup__button_disabled') === null) {
    elements.insertBefore(createStandartElements(popupAddElementInputName.value, popupAddElementInputDescription.value), element);
    closePopup(popupAddElement);
    resetPopupFields (popupAddElementInputName, popupAddElementInputDescription);
    if (event.target.querySelector(data.submitButtonSelector) !== null) {
      innactiveButton(event.target.querySelector(data.submitButtonSelector));
    }
  };
}

function openAddElementPopup(evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    openPopup(popupAddElement);
  };
  if (evt.target.querySelector(data.submitButtonSelector) !== null) {
    innactiveButton(evt.target.querySelector(data.submitButtonSelector));
  }
}

function closeAddElementPopup(evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    closePopup(popupAddElement);
  };
  if (evt.target.querySelector(data.submitButtonSelector) !== null) {
    innactiveButton(evt.target.querySelector(data.submitButtonSelector));
  }
}

function editProfileSubmitButton (event) {
  event.preventDefault(); 
  if (event.target.querySelector('.popup__button_disabled') === null) {
    profileName.textContent = popupProfileInputName.value;
    profileDescription.textContent = popupProfileInputDescription.value;
    closePopup(popupProfile);
  };
}

function closePopupPhoto(evt) {
  if (!(evt.target.closest('.popup__picture-img'))) {
    closePopup(popupPhoto);
  };
}

function resetPopupFields (field1, field2) {
  field1.value = '';
  field2.value = '';
}

function closePopupProfile (evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    closePopup(popupProfile);
  };
}

function openAvatarPopup (evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    openPopup(popupEditAvatar);
  };
  if (evt.target.querySelector(data.submitButtonSelector) !== null) {
    innactiveButton(evt.target.querySelector(data.submitButtonSelector));
  }
}

function closeAvatarPopup (evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    closePopup(popupEditAvatar);
  };
}

function submitAvatar (evt) {
  evt.preventDefault(); 
  if (evt.target.querySelector('.popup__button_disabled') === null) {
    avatarImage.src = popupEditAvatarInputUrl.value;
    closePopup(popupEditAvatar);
    resetPopupFields(popupEditAvatarInputUrl, popupEditAvatarInputUrl);
    if (evt.target.querySelector(data.submitButtonSelector) !== null) {
      innactiveButton(evt.target.querySelector(data.submitButtonSelector));
    }
  };
}

function innactiveButton (button) {
  button.classList.add(data.inactiveButtonClass);
  button.setAttribute("disabled", "disabled");
}

export {editProfilePopup, addElement, openAddElementPopup, closeAddElementPopup, editProfileSubmitButton, closePopupPhoto, closePopupProfile, openAvatarPopup, closeAvatarPopup, submitAvatar};
