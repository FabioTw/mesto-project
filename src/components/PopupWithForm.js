import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler, initialValues) {
    super(selector);
    this._submitHandler = submitHandler;
    this._initialValues = initialValues;
    this._form = this._popup.querySelector('form');
  }

  _getInputValues() {
    this._result = {};
    this._form.querySelectorAll('.popup__input-field').forEach (elem => {
      this._result[elem.name] = elem.value;
    })
    return this._result;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event, values)  => this._submitHandler(event, this._getInputValues()));
  }

  close() {
    super.close();
    this._form.reset();
  }
  
}