import './../pages/index.css';
import Card from './card.js'
import * as utils from './utils.js'
import * as modal from './modal.js'
import FormValidator from './formValidator.js'
import * as variables from './variables.js'
import Section from './section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './userInfo.js';

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

  const user = new UserInfo(result.name, result.about);
  user.getUserInfo().then(res => {return res})
  setNetProfile(result)
  enableValidation(data); 
  //инициализируем карточки
  variables.myApi.getInitialCards(variables.elements) 
  .then((result) => {

    // создаем section
    const section = new Section({items: result, renderer : (result) => {return createStandartElements(result)}}, '.elements');   
    section.renderer();
    // добавляем листенеры
    // редактирование профиля
    const popupEditProfile = new PopupWithForm('.popup_editElement', 
    (event, values) => {
      event.preventDefault(); 
      if (!(event.target.closest('.popup__button_disabled'))) {
        utils.renderLoading(true, variables.submitButton);
        user.setUserInfo(variables.popupProfileInputName.value, variables.popupProfileInputDescription.value)
        .then (res => {
          values.forEach(elem => {
            if (elem.element.name === 'profile-name') {
              variables.profileName.textContent = elem.value;
            }
            if (elem.element.name === 'profile-description') {
              variables.profileDescription.textContent = elem.value;
            }
          });
          })
        .finally (res => {
          popupEditProfile.close();
          utils.renderLoading(false, variables.submitButton)
        }) 
        .catch ((err) => {
          console.log(err)
        });
      };
    });
    // открытие профиля
    variables.editButton.addEventListener('click', () => {
      variables.popupProfileInputName.value = variables.profileName.textContent;
      variables.popupProfileInputDescription.value = variables.profileDescription.textContent;      
      popupEditProfile.open()
    });
    popupEditProfile.setEventListeners();

    // добавление карточки
    const popupAddCard = new PopupWithForm('.popup_addElement', 
    (event, values) => {
      event.preventDefault(); 
      if (!(event.target.closest('.popup__button_disabled'))) {
        utils.renderLoading(true, variables.submitAddElementButton);
        variables.myApi.addCard(variables.popupAddElementInputName.value, variables.popupAddElementInputDescription.value)
        .then(res => {
          variables.elements.insertBefore(createStandartElements(res), variables.element);
          //popupAddCard.close();
          //modal.resetPopupFields (popupAddElementInputName, popupAddElementInputDescription);
          if (event.target.querySelector(data.submitButtonSelector) !== null) {
            modal.innactiveButton(event.target.querySelector(data.submitButtonSelector));
          }
        })
        .finally (res => {
          popupAddCard.close();
          utils.renderLoading(false, variables.submitAddElementButton)
        }) 
        .catch ((err) => {
          console.log(err)
        });
      };
    });
    popupAddCard.setEventListeners();
    // открытие добавления карточки
    variables.addButton.addEventListener('click', () => popupAddCard.open());

    // редактирование аватара
    const popupEditAvatar= new PopupWithForm('.popup_editAvatar', 
    (event, values) => {
      event.preventDefault(); 
      if (!(event.target.closest('.popup__button_disabled'))) {
        utils.renderLoading(true, variables.submitAvatarButton);
        variables.myApi.updateProfileAvatar(variables.popupEditAvatarInputUrl.value)
        .then (res => {
          values.forEach(elem => {
            if (elem.element.name === 'profile-description') {
              variables.avatarImage.src = elem.value;
            }
          });
          if (event.target.querySelector(data.submitButtonSelector) !== null) {
            modal.innactiveButton(event.target.querySelector(data.submitButtonSelector));
          }})
        .finally (res => {
          popupEditAvatar.close();
          utils.renderLoading(false, variables.submitAvatarButton)
        })
        .catch ((err) => {
          console.log(err)
        });
      };
    }
    );
    popupEditAvatar.setEventListeners();
    // открытие аватара
    variables.avatar.addEventListener('click', () => popupEditAvatar.open());

    //добавление карточек
    function addElement (event) {
      event.preventDefault();
      if (!(event.target.closest('.popup__button_disabled'))) {
        utils.renderLoading(true, variables.submitAddElementButton);
        variables.myApi.addCard(variables.popupAddElementInputName.value, variables.popupAddElementInputDescription.value)
        .then(res => {

          const newCard = new card.Card (res , '#element-template', data.id, (link, name) => {
            const popup = new PopupWithImage('.popup_picture', link, name);
            popup.setEventListeners();
            popup.open();
          });
          section.addItem(newCard.generate());
          //popup.close();
          //modal.resetPopupFields (variables.popupAddElementInputName, variables.popupAddElementInputDescription);
          if (event.target.querySelector(data.submitButtonSelector) !== null) {
            modal.innactiveButton(event.target.querySelector(data.submitButtonSelector));
          }
        })
        .finally (res => {
          utils.renderLoading(false, variables.submitAddElementButton)
        })
        .catch ((err) => {
          console.log(err)
        });
      };
    }
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

function createStandartElements(result) {
  const card = new Card (result, '#element-template', data.id, (link, name) => {
    const popup = new PopupWithImage('.popup_picture', link, name);
    popup.setEventListeners();
    popup.open();
  });
  return card.generate();
}

function enableValidation (data) {
  const formList = Array.from(document.querySelectorAll(data.formSelector))
  formList.forEach((formElement) => {
    //setEventListeners(formElement)
    const formValidator = new FormValidator(data, formElement);
    formValidator.enableValidation();
  })
}