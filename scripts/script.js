const popup = document.querySelector('.popup_editElement');
const popup__container = popup.querySelector('.popup__container');
const popup__profileEdit = popup__container.querySelector('.popup__profile-edit');
const popup__input = popup__profileEdit.querySelector('.popup__input');
const popup__inputName = popup__input.querySelector('.popup__input-field_type_name');
const popup__inputDescription = popup__input.querySelector('.popup__input-field_type_description');
const popupAddElement = document.querySelector('.popup_addElement');
const popupAddElement__container = popupAddElement.querySelector('.popup__container');
const popupAddElement__profileEdit = popupAddElement__container.querySelector('.popup__profile-edit');
const popupAddElement__input = popupAddElement__profileEdit.querySelector('.popup__input');
const popupAddElement__inputName = popupAddElement__input.querySelector('.popup__input-field_type_name');
const popupAddElement__inputDescription = popupAddElement__input.querySelector('.popup__input-field_type_description');
const popupPhoto = document.querySelector('.popup_picture');
const popupPhotoImg = popupPhoto.querySelector('.popup__picture-img');
const popupPhotoText = popupPhoto.querySelector('.popup__picture-text');

const profile = document.querySelector('.profile');
const profile__author = profile.querySelector('.profile__author');
const profile__container = profile__author.querySelector('.profile__container');
const profile__info = profile__container.querySelector('.profile__info');
const profile__name = profile__info.querySelector('.profile__name');
const profile__description = profile__container.querySelector('.profile__description');
const elements = document.querySelector('.elements');
const element = elements.querySelector('.element');
const element__description = element.querySelector('.element__description');

const addButton = profile.querySelector('.profile__add-button');
const editButton = profile__info.querySelector('.profile__edit-button');
const closePopupButton = popup.querySelector('.popup__close');
const closePopupAddElementButton = popupAddElement.querySelector('.popup__close');
const closePopupPhoto = popupPhoto.querySelector('.popup__close');
const submitButton = popup__profileEdit.querySelector('.popup__button');
const submitAddElementButton = popupAddElement__profileEdit.querySelector('.popup__button');

standartElements('Карачаевск','./images/karachevsk.png');
standartElements('Гора Эльбрус','./images/elbrus.png');
standartElements('Домбай','./images/dombai.png');
standartElements('Гора Эльбрус','./images/elbrus.png');
standartElements('Домбай','./images/dombai.png');
standartElements('Карачаево-Ч...','./images/karachevsk.png');

editButton.addEventListener('click', profileEditPopup);
submitButton.addEventListener('click', profileEditSubmitButton);
submitAddElementButton.addEventListener('click', addElement);
addButton.addEventListener('click', AddElementPopup);
closePopupButton.addEventListener('click', profileEditPopup);
closePopupAddElementButton.addEventListener('click', AddElementPopup);
closePopupPhoto.addEventListener('click', popupPhotoClose);
popup__inputName.value = profile__name.textContent;
popup__inputDescription.value = profile__description.textContent;

function profileEditPopup() {
  popup.classList.toggle('popup_opened');
}

function AddElementPopup() {
  popupAddElement.classList.toggle('popup_opened');
}

function profileEditSubmitButton (event) {
  event.preventDefault(); 
  profile__name.textContent = popup__inputName.value;
  profile__description.textContent = popup__inputDescription.value;
  popup.classList.toggle('popup_opened');
}

function addElement (event) {
  event.preventDefault();
  const elementTemplate = document.querySelector('#element-template').content;
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  const deleteButton = elementCard.querySelector('.element__delete');
  
  elementCard.querySelector('.element__text').textContent = popupAddElement__inputName.value;
  elementCard.querySelector('.element__photo').src = popupAddElement__inputDescription.value; 
  elementCard.querySelector('.element__photo').addEventListener('click', function(evt) {
    popupPhoto.classList.toggle('popup_opened');
    popupPhotoImg.src = elementCard.querySelector('.element__photo').src;
    popupPhotoText.textContent = elementCard.querySelector('.element__text').textContent;
  });
  elementCard.querySelector('.element__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__button_activated');
  });
  deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.element');
    listItem.remove();
  }); 
  elements.append(elementCard); 
  popupAddElement.classList.toggle('popup_opened');

  popupAddElement__inputName.value = '';
  popupAddElement__inputDescription.value = '';
}

function standartElements(name, link) {
  const elementTemplate = document.querySelector('#element-template').content;
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  const deleteButton = elementCard.querySelector('.element__delete');

  elementCard.querySelector('.element__text').textContent = name;
  elementCard.querySelector('.element__photo').src = link; 
  elementCard.querySelector('.element__photo').addEventListener('click', function(evt) {
    popupPhoto.classList.toggle('popup_opened');
    popupPhotoImg.src = link;
    popupPhotoText.textContent = name;
  });
  elementCard.querySelector('.element__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__button_activated');
  });

  deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.element');
    listItem.remove();
  }); 
  elements.append(elementCard);
}

function popupPhotoClose() {
  popupPhoto.classList.toggle('popup_opened');
}