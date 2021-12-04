import {openPopup, closePopup, renderLoading} from './utils.js';
import {data} from './index.js';
import {profileDescription, profileName, popupProfileInputName, popupProfileInputDescription, elements, popupAddElement, popupAddElementInputName, 
  popupAddElementInputDescription , element, popupProfile, popupPhoto, popupEditAvatar, avatarImage, popupEditAvatarInputUrl, 
  submitAddElementButton, submitButton, submitAvatarButton} from './variables.js';
import {createStandartElements} from './card.js';
import {updateProfile, updateProfileAvatar, addCard, getProfile} from './api.js';

function editProfilePopup() {
  openPopup(popupProfile);
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
      elements.insertBefore(createStandartElements(res.name, res.link, true, data.id, res._id), element);
      closePopup(popupAddElement);
      resetPopupFields (popupAddElementInputName, popupAddElementInputDescription);
      if (event.target.querySelector(data.submitButtonSelector) !== null) {
        innactiveButton(event.target.querySelector(data.submitButtonSelector));
      }
    })
    .finally (res => {
      renderLoading(false, submitAddElementButton)
    })
    .catch ((err) => {
      console.log(err)
    });
  };
}
//открытие попапа для добавление карточек
function openAddElementPopup(evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    openPopup(popupAddElement);
  };
  if (submitAddElementButton.value === 'Сохранить') { //проверяет сохраняется карточка или нет для того чтобы не делать кнопку серой во время сохранения
    if (evt.target.closest(data.submitButtonSelector) !== null) {
      innactiveButton(evt.target.closest(data.submitButtonSelector));
    }
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
//редактирование профиля
function editProfileSubmitButton (event) {
  event.preventDefault(); 
  if (!(event.target.closest('.popup__button_disabled'))) {
    renderLoading(true, submitButton);
    updateProfile(popupProfileInputName.value, popupProfileInputDescription.value)
    .then (res => {
      profileName.textContent = popupProfileInputName.value;
      profileDescription.textContent = popupProfileInputDescription.value;
      closePopup(popupProfile)})
    .finally (res => {
      renderLoading(false, submitButton)
    }) 
    .catch ((err) => {
      console.log(err)
    });
  };
}
//закрытие попапов
function closePopupPhoto(evt) {
  if (!(evt.target.closest('.popup__picture-img'))) {
    closePopup(popupPhoto);
  };
}

function closePopupProfile (evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    closePopup(popupProfile);
  };
}

function resetPopupFields (field1, field2) {
  field1.value = '';
  field2.value = '';
}

function openAvatarPopup (evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    openPopup(popupEditAvatar);
  };
  if (submitAvatarButton.value === 'Сохранить') {
    if (evt.target.closest(data.submitButtonSelector) !== null) {
      innactiveButton(evt.target.closest(data.submitButtonSelector));
    }
  }
}

function closeAvatarPopup (evt) {
  if (!(evt.target.closest('.popup__profile-edit'))) {
    closePopup(popupEditAvatar);
  };
}

function submitAvatar (evt) {
  evt.preventDefault(); 
  if (!(evt.target.closest('.popup__button_disabled'))) {
    renderLoading(true, submitAvatarButton);
    updateProfileAvatar(popupEditAvatarInputUrl.value)
    .then (res => {
      console.log(res)
      avatarImage.src = popupEditAvatarInputUrl.value;
      closePopup(popupEditAvatar);
      resetPopupFields(popupEditAvatarInputUrl, popupEditAvatarInputUrl);
      if (evt.target.querySelector(data.submitButtonSelector) !== null) {
        innactiveButton(evt.target.querySelector(data.submitButtonSelector));
      }})
    .finally (res => {
      renderLoading(false, submitAvatarButton)
    })
    .catch ((err) => {
      console.log(err)
    });
  };
}

function innactiveButton (button) {
  button.classList.add(data.inactiveButtonClass);
  button.setAttribute("disabled", "disabled");
}

export {editProfilePopup, addElement, openAddElementPopup, closeAddElementPopup, editProfileSubmitButton, closePopupPhoto, closePopupProfile, openAvatarPopup, closeAvatarPopup, submitAvatar};