import {switchPopup, renderLoading} from './utils.js';
import {data} from '../script.js';
import {profileDescription, profileName, popupProfileInputName, popupProfileInputDescription, elements, popupAddElement, popupAddElementInputName, 
  popupAddElementInputDescription , element, popupProfile, popupPhoto, popupEditAvatar, avatarImage, popupEditAvatarInputUrl, myProfileId, 
  submitAddElementButton, submitButton, submitAvatarButton} from './variables.js';
import {createStandartElements} from './card.js';
import {updateProfile, updateProfileAvatar, addCard} from './api.js';


function editProfilePopup() {
  switchPopup(popupProfile);
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputDescription.value = profileDescription.textContent;
}
//добавление карточек
function addElement (event) {
  event.preventDefault();
  if (!(event.target.closest('.popup__button_disabled'))) {
    renderLoading(true, submitAddElementButton);
    addCard(popupAddElementInputName.value, popupAddElementInputDescription.value)
    .then(res => {
      elements.insertBefore(createStandartElements(res.name, res.link, true, myProfileId, res._id), element);
      switchPopup(popupAddElement);
      resetPopupFields (popupAddElementInputName, popupAddElementInputDescription);
    });
  };
}
//открытие попапа для добавление карточек
function addElementPopup(evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    switchPopup(popupAddElement);
  };
  if (submitAddElementButton.value === 'Сохранить') { //проверяет сохраняется карточка или нет для того чтобы не делать кнопку серой во время сохранения
    innactiveButton(evt.target.closest(data.submitButtonSelector));
  }
}
//редактирование профиля
function editProfileSubmitButton (event) {
  event.preventDefault(); 
  if (!(event.target.closest('.popup__button_disabled'))) {
    profileName.textContent = popupProfileInputName.value;
    profileDescription.textContent = popupProfileInputDescription.value;
    renderLoading(true, submitButton);
    updateProfile(popupProfileInputName.value, popupProfileInputDescription.value)
    .then (res => {(switchPopup(popupProfile))});
  };
}
//закрытие попапов
function closePopupPhoto(evt) {
  if (!(evt.target.closest('.popup__picture-img'))) {
  switchPopup(popupPhoto);
  };
}

function closePopupProfile (evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    switchPopup(popupProfile);
  };
}

function resetPopupFields (field1, field2) {
  field1.value = '';
  field2.value = '';
}

function openAvatarPopup (evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    switchPopup(popupEditAvatar);
  };
  if (submitAvatarButton.value === 'Сохранить') {
    innactiveButton(evt.target.closest(data.submitButtonSelector));
  }
}

function submitAvatar (evt) {
  evt.preventDefault(); 
  if (!(evt.target.closest('.popup__button_disabled'))) {
    avatarImage.src = popupEditAvatarInputUrl.value;
    renderLoading(true, submitAvatarButton);
    updateProfileAvatar(avatarImage.src)
    .then (res => {
      switchPopup(popupEditAvatar);
      resetPopupFields(popupEditAvatarInputUrl, popupEditAvatarInputUrl);})
  };
}

function innactiveButton (button) {
  button.classList.add(data.inactiveButtonClass);
}

export {editProfilePopup, addElement, addElementPopup, editProfileSubmitButton, closePopupPhoto, closePopupProfile, openAvatarPopup, submitAvatar};