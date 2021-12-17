import {popupPhotoImg, popupPhotoText, elements, popupPhoto, myApi} from './variables.js'
import {data} from './index.js';
import {openPopup} from './utils.js'
import {getInitialCards, deleteCard, addLike, deleteLike,} from './api.js'



export function createStandartElements(name, link, isNew, ownerId = data.id, cardId, likes = []) {
  const elementTemplate = document.querySelector('#element-template').content;
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  const deleteButton = elementCard.querySelector('.element__delete');
  const likeButton = elementCard.querySelector('.element__button');
  const likesText = elementCard.querySelector('.element__likes');
  // console.log(myProfileId)
  checkDeleteButton(deleteButton, ownerId, data.id)
  elementCard.querySelector('.element__text').textContent = name;
  elementCard.querySelector('.element__photo').src = link; 
  elementCard.querySelector('.element__photo').alt = name + ' фото'; 
  elementCard.querySelector('.element__photo').addEventListener('click', function(evt) {
    openPopup(popupPhoto);
    popupPhotoImg.src = link;
    popupPhotoImg.alt = name + ' фото';
    popupPhotoText.textContent = name;
  });
  if (!isNew) {
    checkLikeButton(data.id, likes, likeButton)
  }
  likeButton.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('element__button_activated')){
      myApi.deleteLike(cardId)
      .then (res => {
        evt.target.classList.remove('element__button_activated');
        likesText.textContent = res.likes.length;
      })
      .catch ((err) => {
        console.log(err)
      });
    } else {
      myApi.addLike(cardId)
      .then (res => {
        evt.target.classList.add('element__button_activated');
        likesText.textContent = res.likes.length;
      })
      .catch ((err) => {
        console.log(err)
      });
    }
  });
  likesText.textContent = likes.length;

  deleteButton.addEventListener('click', function () {
    myApi.deleteCard(cardId)
    .then (res => {
      const listItem = deleteButton.closest('.element');
      listItem.remove();
    })     
    .catch ((err) => {
      console.log(err)
    });
  }); 
  return elementCard;
}

function checkDeleteButton(deleteButton, profileId, myProfileId) {
  // console.log((profileId) + 'и мой ' + myProfileId)
  if (profileId !== String(myProfileId)) {
    deleteButton.parentNode.removeChild(deleteButton)
  }
}

function checkLikeButton(profileId, likes, likeButton) {
  likes.forEach(element => {
    if (element._id === profileId) {
      likeButton.classList.add('element__button_activated');
    } else {
      likeButton.classList.remove('element__button_activated');
    }
  });
}