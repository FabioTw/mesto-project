import {popupPhotoImg, popupPhotoText, elements, popupPhoto, myApi} from './variables.js'
import {data} from './index.js';
import {openPopup} from './utils.js'
import {getInitialCards, deleteCard, addLike, deleteLike,} from './api.js'

class Card {
  constructor(name, link, isNew, ownerId, cardId, likes = [], myProfileId, template){
    this._name = name;
    this._link = link;
    this._template = template;
    this._likes = likes;
    this._isNew = isNew;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._myProfileId = myProfileId;
  }

  generate() {
    this._element = this._getElement();
    this._likeButton = this._element.querySelector('.element__button');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._likesText = this._element.querySelector('.element__likes');
    this._checkDeleteButton();
    if (!this._isNew) {
      this._checkLikeButton()
    }
    this._setEventListeners();
    this._likesText.textContent = this._likes.length;
    return this._element;
  }

  _getElement() {
    const elementTemplate = document.querySelector(this._template).content;
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
    elementCard.querySelector('.element__text').textContent = this._name;
    elementCard.querySelector('.element__photo').src = this._link; 
    elementCard.querySelector('.element__photo').alt = this._name + ' фото'; 
    return elementCard;
  }

  _setEventListeners() {
    this._element.querySelector('.element__photo').addEventListener('click', this._handlePopup);
    this._likeButton.addEventListener('click', (evt) => this._handleLike(evt));
    this._deleteButton.addEventListener('click', this._handleDelete);
  }


  _handlePopup() {
    openPopup(popupPhoto);
    popupPhotoImg.src = this.link;
    popupPhotoImg.alt = this.name + ' фото';
    popupPhotoText.textContent = this.name;
  }

  // проверяем и удаляем кнопку удаления
  _checkDeleteButton() {
    if (this._ownerId !== String(this._myProfileId)) {
      this._deleteButton.parentNode.removeChild(this._deleteButton);
    }
  }

  _handleDelete() {
    myApi.deleteCard(this._cardId)
    .then (res => {
      const listItem = this._deleteButton.closest('.element');
      listItem.remove();
    })     
    .catch ((err) => {
      console.log(err)
    });
  }

  _checkLikeButton() {
    this._likes.forEach(element => {
      if (element._id === this.profileId) {
        this._likeButton.classList.add('element__button_activated');
      } else {
        this._likeButton.classList.remove('element__button_activated');
      }
    });
  }

  _handleLike(evt) {
    if (evt.target.classList.contains('element__button_activated')){
      myApi.deleteLike(this._cardId)
      .then (res => {
        evt.target.classList.remove('element__button_activated');
        this._likesText.textContent = res.likes.length;
      })
      .catch ((err) => {
        console.log(err)
      });
    } else {
      myApi.addLike(this._cardId)
      .then (res => {
        evt.target.classList.add('element__button_activated');
        this._likesText.textContent = res.likes.length;
      })
      .catch ((err) => {
        console.log(err)
      });
    }
  }
}

const card = new Card ('', '', false,'','', [],'', '#element-template');
console.log(card.generate())

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