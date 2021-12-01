
import {editProfilePopup, addElement, openAddElementPopup, closeAddElementPopup, editProfileSubmitButton, closePopupPhoto, closePopupProfile, openAvatarPopup, closeAvatarPopup, submitAvatar} from './modal.js';
import {editButton, submitAddElementButton, addButton, popupAddElement, popupPhoto, popupProfile, avatar, popupEditAvatar, popup, popupEditAvatarContainer, popupProfileContainer, popupAddElementContainer} from './variables.js';

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
    console.log('hi')
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
    document.removeEventListener('keydown', closeEscButton);
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


export {openPopup, closePopup};