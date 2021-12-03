import {popupPhotoImg, popupPhotoText, elements, popupPhoto, myProfileId} from './variables.js'
import {openPopup} from './utils.js'
import {getInitialCards, deleteCard, addLike, deleteLike,} from './api.js'

getInitialCards(elements)
  .then((result) => {
    result.forEach(value => {
      elements.append(createStandartElements(value.name, value.link, false, value.owner._id, value._id, value.likes));
    });
  })
  .catch((err) => {
    console.log(err);
  }); 

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
    openPopup(popupPhoto);
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
      .then (res => {
        evt.target.classList.remove('element__button_activated');
        likesText.textContent = res.likes.length;
      })
      .catch ((err) => {
        console.log(err)
      });
    } else {
      addLike(card_id)
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
    deleteCard(card_id)
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