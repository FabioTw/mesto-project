import * as api from './api.js';

const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_editElement');
const popupProfileContainer = popupProfile.querySelector('.popup__container');
const popupProfileEdit = popupProfileContainer.querySelector('.popup__profile-edit');
const popupProfileInput = popupProfileEdit.querySelector('.popup__input');
const popupProfileInputName = popupProfileInput.querySelector('.popup__input-field_type_name');
const popupProfileInputDescription = popupProfileInput.querySelector('.popup__input-field_type_description');
const popupAddElement = document.querySelector('.popup_addElement');
const popupAddElementContainer = popupAddElement.querySelector('.popup__container');
const popupAddElementProfileEdit = popupAddElementContainer.querySelector('.popup__profile-edit');
const popupAddElementInput = popupAddElementProfileEdit.querySelector('.popup__input');
const popupAddElementInputName = popupAddElementInput.querySelector('.popup__input-field_type_name');
const popupAddElementInputDescription = popupAddElementInput.querySelector('.popup__input-field_type_description');
const popupPhoto = document.querySelector('.popup_picture');
const popupPhotoImg = popupPhoto.querySelector('.popup__picture-img');
const popupPhotoText = popupPhoto.querySelector('.popup__picture-text');
const popupEditAvatar = document.querySelector('.popup_editAvatar');
const popupEditAvatarContainer = popupEditAvatar.querySelector('.popup__container');
const popupEditAvatarProfileEdit = popupEditAvatarContainer.querySelector('.popup__profile-edit');
const popupEditAvatarInput = popupEditAvatarProfileEdit.querySelector('.popup__input')
const popupEditAvatarInputUrl = popupEditAvatarInput.querySelector('.popup__input-field_type_avatar')

const profile = document.querySelector('.profile');
const profileAuthor = profile.querySelector('.profile__author');
const profileContainer = profileAuthor.querySelector('.profile__container');
const profileInfo = profileContainer.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileContainer.querySelector('.profile__description');
const elements = document.querySelector('.elements');
const element = elements.querySelector('.element');
const elementDescription = element.querySelector('.element__description');
const avatar = document.querySelector('.profile__avatar-container');
const avatarImage = avatar.querySelector('.profile__avatar');


const addButton = profile.querySelector('.profile__add-button');
const editButton = profileInfo.querySelector('.profile__edit-button');

const submitButton = popupProfileEdit.querySelector('.popup__button');
const submitAddElementButton = popupAddElementProfileEdit.querySelector('.popup__button');

const submitAvatarButton = popupEditAvatarProfileEdit.querySelector('.popup__button');

const myApi = new api.Api(api.config);

export {editButton, submitButton, submitAddElementButton, addButton, popupPhotoImg, popupPhotoText, 
  profileDescription, profileName, popupProfileInputName, popupProfileInputDescription, elements, popupAddElement, 
  popupAddElementInputName, popupAddElementInputDescription , element, popupProfile, popupPhoto, popupProfileEdit,
  avatar, popupEditAvatar, submitAvatarButton, avatarImage, popupEditAvatarInputUrl, popup, popupProfileContainer, popupAddElementContainer, popupEditAvatarContainer, myApi};