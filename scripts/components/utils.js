
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

popup.forEach(element => {
  element.addEventListener('keydown', closeEscButton);
});

function closeEscButton (event) {
  if (event.code == 'Escape') {
    switchPopup(this);
  }
};

function switchPopup(popup) {
  popup.classList.toggle('popup_opened');
}

export {switchPopup};