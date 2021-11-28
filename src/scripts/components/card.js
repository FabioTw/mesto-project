import {popupPhotoImg, popupPhotoText, elements, popupPhoto, myProfileId} from './variables.js'
import {switchPopup} from './utils.js'
import {getInitialCards, deleteCard, addLike, deleteLike,} from './api.js'

getInitialCards(elements)

export function createStandartElements(name, link, isNew, owner_id = myProfileId, card_id, likes = []) {
  const elementTemplate = document.querySelector('#element-template').content;
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  const deleteButton = elementCard.querySelector('.element__delete');
  const likeButton = elementCard.querySelector('.element__button');
  const likesText = elementCard.querySelector('.element__likes');

  checkDeleteButton(deleteButton, owner_id)

  elementCard.querySelector('.element__text').textContent = name;
  elementCard.querySelector('.element__photo').src = link; 
  elementCard.querySelector('.element__photo').alt = name + ' фото'; 
  elementCard.querySelector('.element__photo').addEventListener('click', function(evt) {
    switchPopup(popupPhoto);
    popupPhotoImg.src = link;
    popupPhotoImg.alt = name + ' фото';
    popupPhotoText.textContent = name;
  });
  if (!isNew) {
    checkLikeButton(myProfileId, likes, likeButton)
  }
  likeButton.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('element__button_activated')){
      deleteLike(card_id)
      evt.target.classList.remove('element__button_activated');
      likesText.textContent = Number(likesText.textContent) - 1;
    } else {
      addLike(card_id)
      evt.target.classList.add('element__button_activated');
      likesText.textContent = Number(likesText.textContent) + 1;
    }
  });
  likesText.textContent = likes.length;

  deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.element');
    listItem.remove();
    deleteCard(card_id);
  }); 
  return elementCard;
}

function checkDeleteButton(deleteButton, profile_id) {
  if (profile_id !== myProfileId) {
    deleteButton.parentNode.removeChild(deleteButton)
  }
}

function checkLikeButton(profile_id, likes, likeButton) {
  likes.forEach(element => {
    if (element._id === profile_id) {
      likeButton.classList.add('element__button_activated');
    } else {
      likeButton.classList.remove('element__button_activated');
    }
  });
}