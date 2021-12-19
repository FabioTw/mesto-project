import './../pages/index.css';
import * as card from './card.js'
import * as utils from './utils.js'
import * as modal from './modal.js'
import * as validate from './validate.js'
import * as variables from './variables.js'
import * as api from './api.js'


export const data = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let myProfileId

variables.myApi.getProfile()
.then((result) => {
  setNetProfile(result);
  validate.enableValidation(data); 
  // variables.myApi.getInitialCards(variables.elements)
  // .then((result) => {
  //   result.forEach(value => {
  //     variables.elements.append(card.createStandartElements(value));
  //   });
  // })
  variables.myApi.getInitialCards(variables.elements) 
  .then((result) => {
    // console.log({result, renderer : (result) => {card.createStandartElements(result)}});
    const section = new Section({items: result, renderer : (result) => {return card.createStandartElements(result)}}, variables.elements);   
    section.addItem()
  })
  .catch((err) => {
    console.log(err);
  }); 

})
.catch ((err) => {
  console.log(err)
}); 

function setNetProfile(res) {
  variables.profileName.textContent = res.name;
  variables.profileDescription.textContent = res.about;
  variables.avatarImage.src = res.avatar;
  myProfileId = String(res._id);
  data.id = myProfileId
}

// variables.myApi.getInitialCards(variables.elements) 
//   .then((result) => {
//     // console.log({result, renderer : (result) => {card.createStandartElements(result)}});
//     const section = new Section({items: result, renderer : (result) => {card.createStandartElements(result)}}, variables.elements);   
//     section._addItem()
//   })


class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

  addItem() {
    this._items.forEach(item => {
      this._selector.append(this._renderer(item));
    })
  }
}