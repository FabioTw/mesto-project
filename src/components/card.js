import {popupPhotoImg, popupPhotoText, elements, popupPhoto, myApi} from './variables.js'
import {data} from './index.js';
import {openPopup} from './utils.js'
import {getInitialCards, deleteCard, addLike, deleteLike,} from './api.js'
import PopupWithImage from './PopupWithImage.js'

export class Card {
  //{name, link, owner, cardId, likes = [], myProfileId}
  constructor(value, template, myProfileId, handleCardClick){
    // console.log(result)
    this._name = value.name;
    this._link = value.link;
    this._template = template;
    this._likes = value.likes;
    this._ownerId = value.owner._id;
    this._cardId = value._id;
    this._myProfileId = myProfileId;
    this._handleCardClick = handleCardClick;
    
  }

  generate() {
    this._element = this._getElement();
    this._likeButton = this._element.querySelector('.element__button');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._likesText = this._element.querySelector('.element__likes');

    this._checkDeleteButton();
    this._checkLikeButton();
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
    this._element.querySelector('.element__photo').addEventListener('click', () => this._handleCardClick(this._link, this._name));
    this._likeButton.addEventListener('click', (evt) => this._handleLike(evt));
    this._deleteButton.addEventListener('click', () =>  this._handleDelete());
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
      if (element._id === this._myProfileId) {
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


export function createStandartElements(result) {
  //console.log(result);
  const card = new Card (result, '#element-template', data.id, (link, name) => {
    const popup = new PopupWithImage('.popup_picture', link, name);
    popup.setEventListeners();
    popup.open();
  });
  return card.generate();
}
