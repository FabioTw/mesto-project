
import {addElement, openAddElementPopup, closeAddElementPopup, editProfileSubmitButton, closePopupProfile} from './modal.js';
import {editButton, addButton, popupAddElement, popupPhoto, popupProfile, avatar, popupEditAvatar, popup, popupProfileContainer, popupAddElementContainer, popupEditAvatarContainer} from './variables.js';


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



//const apopup = new Popup('.popup_editAvatar'); 
//apopup.setEventListeners();
//apopup.open();
//во всех функция вызовах переписать
export {openPopup, closePopup, renderLoading};