import {popupPhotoImg, popupPhotoText, elements, popupPhoto} from './variables.js'
import {openPopup} from './utils.js'
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
  elements.append(createStandartElements(value.name, value.link));
});

export function createStandartElements(name, link) {
  const elementTemplate = document.querySelector('#element-template').content;
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  const deleteButton = elementCard.querySelector('.element__delete');

  elementCard.querySelector('.element__text').textContent = name;
  elementCard.querySelector('.element__photo').src = link; 
  elementCard.querySelector('.element__photo').alt = name + ' фото'; 
  elementCard.querySelector('.element__photo').addEventListener('click', function(evt) {
    openPopup(popupPhoto);
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