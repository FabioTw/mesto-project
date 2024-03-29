export default class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._data.inputSelector))
    this._buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
  }

  enableValidation() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(formInput) {
    if (!formInput.validity.valid) {
      this._showError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._data.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "disabled");
    } else {
      this._buttonElement.classList.remove(this._data.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", "disabled");  
    }
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._data.inputErrorClass);
    this._setErrorMessage(inputElement, errorElement, errorMessage);
    errorElement.classList.add(this._data.errorClass);
  }


  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._data.inputErrorClass);
    errorElement.classList.remove(this._data.errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _setErrorMessage (inputElement, errorElement, errorMessage) {
    if (inputElement.validity.valueMissing) {
      errorElement.textContent = 'Вы пропустили это поле.';
    } else if (inputElement.validity.typeMismatch) {
      errorElement.textContent = 'Введите адрес сайта.';
    } else {
      errorElement.textContent = errorMessage;
    }
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }
}


