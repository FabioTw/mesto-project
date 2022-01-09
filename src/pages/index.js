import './../pages/index.css';
import Card from '../components/Card.js';
import * as utils from '../utils/utils.js';
import FormValidator from '../components/FormValidator.js';
import * as variables from '../utils/variables.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// let myProfileId

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  header : {
    authorization: '7fbcd172-bf5b-475f-bf14-ccd6d6f0291e',
    'Content-Type': 'application/json'
  }
}

const myApi = new Api(config);

myApi.getProfile()
.then((result) => {
  const user = new UserInfo('.profile__name', '.profile__description', '.profile__avatar', () => {return myApi.getProfile()});
  user.setUserInfo(result);
  variables.data.id = user.getUserInfo().profileId;
  //инициализируем карточки
  myApi.getInitialCards() 
  .then((result) => {
      // включаем валидацию
    const formList = Array.from(document.querySelectorAll(variables.data.formSelector))  
    let formValidatorProfileSettings;
    let formValidatorAddElement;
    let formValidatorEditAvatar;
    formList.forEach((formElement) => {
      if (formElement.name === 'profile-settings') {
        formValidatorProfileSettings = new FormValidator(variables.data, formElement);
        formValidatorProfileSettings.enableValidation();
      }
      if (formElement.name === 'profile-addElement') { 
        formValidatorAddElement = new FormValidator(variables.data, formElement);
        formValidatorAddElement.enableValidation();
      }
      if (formElement.name === 'profile-editAvatar') { 
        formValidatorEditAvatar = new FormValidator(variables.data, formElement);
        formValidatorEditAvatar.enableValidation();
      }     
    })

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
        user.setUserInfo({name: values['profile-name'], about: values['profile-description']});
        myApi.updateProfile(values['profile-name'], values['profile-description'])
        .then (res => {
          popupEditProfile.close();
        })
        .finally (res => {
          utils.renderLoading(false, variables.submitButton)
        }) 
        .catch ((err) => {
          console.log(err)
        });
      };
    });
    // открытие профиля
    variables.editButton.addEventListener('click', () => {
      const profileInfo = user.getUserInfo();
      variables.popupProfileInputName.value = profileInfo.name;
      variables.popupProfileInputDescription.value = profileInfo.description;      
      popupEditProfile.open()
    });
    popupEditProfile.setEventListeners();
    
    // добавление карточки
    const popupAddCard = new PopupWithForm('.popup_addElement', 
    (event, values) => {
      event.preventDefault(); 
      if (!(event.target.closest('.popup__button_disabled'))) {
        utils.renderLoading(true, variables.submitAddElementButton);
        myApi.addCard(values['profile-name'], values['profile-description'])
        .then(res => {
          section.addItem(createStandartElements(res), variables.element);
        })
        .then(res => {
          popupAddCard.close();
          if (event.target.querySelector(variables.data.submitButtonSelector) !== null) {
            formValidatorAddElement.resetValidation();
          }
        })
        .finally (res => {
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
        myApi.updateProfileAvatar(variables.popupEditAvatarInputUrl.value)
        .then (res => {
            variables.avatarImage.src = values['profile-description'];
          }) 
        .then(res => {
          popupEditAvatar.close()
          if (event.target.querySelector(variables.data.submitButtonSelector) !== null) {
            formValidatorEditAvatar.resetValidation();
          }
        })
        .finally (res => {
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
  })
  .catch((err) => {
    console.log(err);
  }); 

})
.catch ((err) => {
  console.log(err)
}); 

function createStandartElements(result) {
  const popup = new PopupWithImage('.popup_picture');
  popup.setEventListeners();
  const card = new Card (result, '#element-template', variables.data.id, (link, name) => {
    popup.open(link, name);
  }, (elem) => {return myApi.deleteCard(elem)});
  return card.generate();
}

// function enableValidation (data) {
//   const formList = Array.from(document.querySelectorAll(data.formSelector))
//   formList.forEach((formElement) => {
//     //setEventListeners(formElement)
//     const formValidator = new FormValidator(data, formElement);
//     formValidator.enableValidation();
//   })
// }