import Popup from './popup.js'

export default class PopupWithForm extends Popup {
  constructor(selector, constructor, initialValues) {
    super(selector);
    this._constructor = constructor;
    this._initialValues = initialValues;
  }

  _getInputValues() {
    const result = [];
    this._popup.querySelector('form').querySelectorAll('.popup__input-field').forEach (elem => {
      result.push({element: elem, value: elem.value});
    })
    return result;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event, values)  => this._constructor(event, this._getInputValues()));
  }

  close() {
    super.close();
    this._popup.querySelector('form').reset();
  }
  
}