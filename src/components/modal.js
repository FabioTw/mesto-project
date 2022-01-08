import {data} from './variables.js';

function resetPopupFields (field1, field2) {
  field1.value = '';
  field2.value = '';
}

function innactiveButton (button) {
  button.classList.add(data.inactiveButtonClass);
  button.setAttribute("disabled", "disabled");
}

export {innactiveButton, resetPopupFields};