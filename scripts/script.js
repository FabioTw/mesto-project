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

const profile = document.querySelector('.profile');
const profileAuthor = profile.querySelector('.profile__author');
const profileContainer = profileAuthor.querySelector('.profile__container');
const profileInfo = profileContainer.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileContainer.querySelector('.profile__description');
const elements = document.querySelector('.elements');
const element = elements.querySelector('.element');
const elementDescription = element.querySelector('.element__description');

const addButton = profile.querySelector('.profile__add-button');
const editButton = profileInfo.querySelector('.profile__edit-button');
const closePopupButton = popupProfile.querySelector('.popup__close');
const closePopupAddElementButton = popupAddElement.querySelector('.popup__close');
const closePopupPhoto = popupPhoto.querySelector('.popup__close');
const submitButton = popupProfileEdit.querySelector('.popup__button');
const submitAddElementButton = popupAddElementProfileEdit.querySelector('.popup__button');

const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/karachevsk.png'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.png'
  },
  {
    name: 'Домбай',
    link: './images/dombai.png'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.png'
  },
  {
    name: 'Домбай',
    link: './images/dombai.png'
  },
  {
    name: 'Карачаево-Ч...',
    link: './images/karachevsk.png'
  }
]; 

initialCards.forEach(value => {
  elements.append(standartElements(value.name, value.link));
});

editButton.addEventListener('click', editProfilePopup);
submitButton.addEventListener('click', editProfileSubmitButton);
submitAddElementButton.addEventListener('click', addElement);
addButton.addEventListener('click', addElementPopup);
closePopupButton.addEventListener('click', editProfilePopup);
closePopupAddElementButton.addEventListener('click', addElementPopup);
closePopupPhoto.addEventListener('click', popupPhotoClose);
popupProfileInputName.value = profileName.textContent;
popupProfileInputDescription.value = profileDescription.textContent;

function editProfilePopup() {
  switchPopup(popupProfile);
}

function addElementPopup() {
  switchPopup(popupAddElement);
}

function editProfileSubmitButton (event) {
  event.preventDefault(); 
  profileName.textContent = popupProfileInputName.value;
  profileDescription.textContent = popupProfileInputDescription.value;
  switchPopup(popupProfile);
}

function addElement (event) {
  event.preventDefault();
  elements.insertBefore(standartElements(popupAddElementInputName.value, popupAddElementInputDescription.value), element);
  switchPopup(popupAddElement);
  resetPopupFields (popupAddElementInputName, popupAddElementInputDescription);
}

function standartElements(name, link) {
  const elementTemplate = document.querySelector('#element-template').content;
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  const deleteButton = elementCard.querySelector('.element__delete');

  elementCard.querySelector('.element__text').textContent = name;
  elementCard.querySelector('.element__photo').src = link; 
  elementCard.querySelector('.element__photo').alt = name + ' фото'; 
  elementCard.querySelector('.element__photo').addEventListener('click', function(evt) {
    switchPopup(popupPhoto);
    popupPhotoImg.src = link;
    popupPhotoImg.alt = name + ' фото';
    popupPhotoText.textContent = name;
  });
  elementCard.querySelector('.element__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__button_activated');
  });

  deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.element');
    listItem.remove();
  }); 
  return elementCard;
}

function popupPhotoClose() {
  switchPopup(popupPhoto);
}

function switchPopup(popup) {
  popup.classList.toggle('popup_opened');
}

function resetPopupFields (field1, field2) {
  field1.value = '';
  field2.value = '';
}