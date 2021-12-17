// import { construct } from 'core-js/fn/reflect';
import {data} from './index.js'
import {renderLoading} from './utils.js';

class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
  }

  enableValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
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

  _toggleButtonState(inputList) {
    const buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
    if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._data.inactiveButtonClass);
        buttonElement.setAttribute("disabled", "disabled");
    } else {
        buttonElement.classList.remove(this._data.inactiveButtonClass);
        buttonElement.removeAttribute("disabled", "disabled");  
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
}


export function enableValidation (data) {
  const formList = Array.from(document.querySelectorAll(data.formSelector))
  formList.forEach((formElement) => {
    //setEventListeners(formElement)
    const formValidator = new FormValidator(data, formElement);
    formValidator.enableValidation();
  })
}

// function checkInputValidity (formElement, formInput) {
//   if (!formInput.validity.valid) {
//     showError(formElement, formInput, formInput.validationMessage);
//   } else {
//     hideInputError(formElement, formInput);
//   }
// }

// function showError (formElement, inputElement, errorMessage) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(data.inputErrorClass);
//   setErrorMessage(inputElement,errorElement, errorMessage);
//   errorElement.classList.add(data.errorClass);
// };

// function hideInputError (formElement, inputElement) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(data.inputErrorClass);
//   errorElement.classList.remove(data.errorClass);
//   errorElement.textContent = '';
// };

// function setEventListeners (formElement) {
//   const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, formElement);
//     });
//   });
// };

// function toggleButtonState (inputList, formElement) {
//   const buttonElement = formElement.querySelector(data.submitButtonSelector);
//   if (hasInvalidInput(inputList)) {
//       buttonElement.classList.add(data.inactiveButtonClass);
//       buttonElement.setAttribute("disabled", "disabled");
//   } else {
//       buttonElement.classList.remove(data.inactiveButtonClass);
//       buttonElement.removeAttribute("disabled", "disabled");  
//   }
// }

// function hasInvalidInput (inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// };

// function setErrorMessage (inputElement, errorElement, errorMessage) {
//   if (inputElement.validity.valueMissing) {
//     errorElement.textContent = 'Вы пропустили это поле.';
//   } else if (inputElement.validity.typeMismatch) {
//     errorElement.textContent = 'Введите адрес сайта.';
//   } else {
//     errorElement.textContent = errorMessage;
//   }
// }