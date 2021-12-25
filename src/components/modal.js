import {openPopup, closePopup, renderLoading} from './utils.js';
import {data, section} from './index.js';
import {profileDescription, profileName, popupProfileInputName, popupProfileInputDescription, elements, popupAddElement, popupAddElementInputName, 
  popupAddElementInputDescription , element, popupProfile, popupPhoto, popupEditAvatar, avatarImage, popupEditAvatarInputUrl, 
  submitAddElementButton, submitButton, submitAvatarButton, myApi} from './variables.js';
import {createStandartElements} from './card.js';
import {updateProfile, updateProfileAvatar, addCard, getProfile} from './api.js';
import PopupWithForm from './PopupWithForm.js'

//открытие попапа для добавление карточек
// function openAddElementPopup(evt) {
//   if (!(evt.target.closest('.popup__profile-edit'))) {
//     openPopup(popupAddElement);
//   };
//   if (submitAddElementButton.value === 'Сохранить') { //проверяет сохраняется карточка или нет для того чтобы не делать кнопку серой во время сохранения
//     if (evt.target.closest(data.submitButtonSelector) !== null) {
//       innactiveButton(evt.target.closest(data.submitButtonSelector));
//     }
//   }
// }

// function closeAddElementPopup(evt) {
//   if (!(evt.target.closest('.popup__profile-edit'))) {
//     closePopup(popupAddElement);
//   };
//   if (evt.target.querySelector(data.submitButtonSelector) !== null) {
//     innactiveButton(evt.target.querySelector(data.submitButtonSelector));
//   }
// }

// function closePopupProfile (evt) {
//   if (!(evt.target.closest('.popup__profile-edit'))) {
//     closePopup(popupProfile);
//   };
// }

function resetPopupFields (field1, field2) {
  field1.value = '';
  field2.value = '';
}


function innactiveButton (button) {
  button.classList.add(data.inactiveButtonClass);
  button.setAttribute("disabled", "disabled");
}

export {innactiveButton, resetPopupFields};