
import {editProfilePopup, addElement, openAddElementPopup, closeAddElementPopup, editProfileSubmitButton, closePopupPhoto, closePopupProfile, openAvatarPopup, closeAvatarPopup, submitAvatar} from './modal.js';
import {editButton, addButton, popupAddElement, popupPhoto, popupProfile, avatar, popupEditAvatar, popup, popupProfileContainer, popupAddElementContainer, popupEditAvatarContainer} from './variables.js';

editButton.addEventListener('click', editProfilePopup);
popupProfileContainer.addEventListener('submit', editProfileSubmitButton);
popupAddElementContainer.addEventListener('submit', addElement);
popupEditAvatarContainer.addEventListener('submit', submitAvatar);
addButton.addEventListener('click', openAddElementPopup);
popupAddElement.addEventListener('click', closeAddElementPopup);
popupPhoto.addEventListener('click', closePopupPhoto);
popupProfile.addEventListener('click', closePopupProfile);
avatar.addEventListener('click', openAvatarPopup);
popupEditAvatar.addEventListener('click', closeAvatarPopup);

function closeEscButton (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscButton);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscButton);
}

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.value = 'Сохранение...';
    button.textContent = 'Сохранение...';
  } else {
    button.value = 'Сохранить';
    button.textContent = 'Сохранить';
  }
}

export {openPopup, closePopup, renderLoading};