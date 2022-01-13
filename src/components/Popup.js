export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handlerEscClose.bind(this)
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  open() {
    this._popup.classList.add('popup_opened');
    
    document.addEventListener('keydown', this._handleEscClose);
  }

  _handlerEscClose (event) {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') == true || event.target.classList.contains('popup__close') == true) {
        this.close();
      }
    })
  }
}
