
import {editProfilePopup, addElement, addElementPopup, editProfileSubmitButton, closePopupPhoto, closePopupProfile, openAvatarPopup, submitAvatar} from './modal.js';
import {editButton, submitButton, submitAddElementButton, addButton, popupAddElement, popupPhoto, popupProfile, avatar, submitAvatarButton, popupEditAvatar, popup} from './variables.js';

editButton.addEventListener('click', editProfilePopup);
submitButton.addEventListener('click', editProfileSubmitButton);
submitAddElementButton.addEventListener('click', addElement);
submitAvatarButton.addEventListener('click', submitAvatar);
addButton.addEventListener('click', addElementPopup);
popupAddElement.addEventListener('click', addElementPopup);
popupPhoto.addEventListener('click', closePopupPhoto);
popupProfile.addEventListener('click', closePopupProfile);
avatar.addEventListener('click', openAvatarPopup);
popupEditAvatar.addEventListener('click', openAvatarPopup);

document.addEventListener('keyup', closeEscButton);

function closeEscButton (event) {
  popup.forEach(element => {
    if (element.classList.contains('popup_opened')) {
      if (event.key == 'Escape') {
        switchPopup(element);
      }
    }
  });
};

function switchPopup(popup) {
  popup.classList.toggle('popup_opened');
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

export {switchPopup, renderLoading};