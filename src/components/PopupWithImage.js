import Popup from './popup.js'

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._pictureImage = this._popup.querySelector('.popup__picture-img');
    this._pictureText = this._popup.querySelector('.popup__picture-text');
  }
  
  open(src, name) {
    super.open();
    this._pictureImage.src = src;
    this._pictureImage.alt = name + ' фото';
    this._pictureText.textContent = name;
  }
}