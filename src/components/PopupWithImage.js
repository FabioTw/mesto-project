import Popup from './popup.js'

export default class PopupWithImage extends Popup {
  constructor(selector, src, name) {
    super(selector);
    this._src = src;
    this._name = name;
  }
  
  open() {
    super.open();
    this._popup.querySelector('.popup__picture-img').src = this._src;
    this._popup.querySelector('.popup__picture-text').alt = this._name + ' фото';
    this._popup.querySelector('.popup__picture-text').textContent = this._name;
  }

}