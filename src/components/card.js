export default class Card {
  constructor(value, template, myProfileId, handleCardClick, handleDeleteCard, handlerCardLike){
    this._name = value.name;
    this._link = value.link;
    this._template = template;
    this._likes = value.likes;
    this._ownerId = value.owner._id;
    this._cardId = value._id;
    this._myProfileId = myProfileId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._elementTemplate = document.querySelector(this._template).content;
    const elementCard = this._elementTemplate.querySelector('.element').cloneNode(true);
    this._cardImage = elementCard.querySelector('.element__photo');
    this._cardText = elementCard.querySelector('.element__text');
    this._element = elementCard;
    this._handleCardLike = handlerCardLike;
  }

  generate() {
    this._setElementValues();
    this._likeButton = this._element.querySelector('.element__button');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._likesText = this._element.querySelector('.element__likes');

    this._checkDeleteButton();
    this._checkLikeButton();
    this._setEventListeners();
    this._likesText.textContent = this._likes.length;
    return this._element;
  }

  _setElementValues() {
    this._cardText.textContent = this._name;
    this._cardImage.src = this._link; 
    this._cardImage.alt = this._name + ' фото'; 
  }

  _setEventListeners() {
    this._element.querySelector('.element__photo').addEventListener('click', () => this._handleCardClick(this._link, this._name));
    this._likeButton.addEventListener('click', (evt) => this._handleCardLike(evt, this._cardId, this._likesText));
    this._deleteButton.addEventListener('click', () =>  this._handleDelete());
  }

  // проверяем и удаляем кнопку удаления
  _checkDeleteButton() {
    if (this._ownerId !== String(this._myProfileId)) {
      this._deleteButton.parentNode.removeChild(this._deleteButton);
    }
  }

  _handleDelete() {
    this._handleDeleteCard(this._cardId)
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
}