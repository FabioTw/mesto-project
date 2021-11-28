import {profileDescription, profileName, avatarImage, submitAddElementButton, submitButton, submitAvatarButton} from './variables.js';
import {createStandartElements} from './card.js'
import {renderLoading} from './utils.js'

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  header : {
    authorization: '7fbcd172-bf5b-475f-bf14-ccd6d6f0291e',
    'Content-Type': 'application/json'
  }
}

function setNetProfile(res) {
  profileName.textContent = res.name;
  profileDescription.textContent = res.about;
  avatarImage.src = res.avatar;
}

function checkResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = (elements) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.header
  })
  .then(res => {
    return checkResult(res)
  })
  .then((result) => {
    result.forEach(value => {
      elements.append(createStandartElements(value.name, value.link, false, value.owner._id, value._id, value.likes));
    });
  })
  .catch((err) => {
    console.log(err);
  }); 
}

export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.header,
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(res => {
    return checkResult(res)
  })
  .finally (res => {
    renderLoading(false, submitAddElementButton)
  }); 
}

export const deleteCard = (card_id) => {
  return fetch(`${config.baseUrl}/cards/${card_id}`, {
    method: 'DELETE',
    headers: config.header,
  })
  .then(res => {
    return checkResult(res)
  });
}

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.header
  })
    .then(res => {
      return checkResult(res)
    })
    .then((result) => {
      setNetProfile(result);
    }); 
}

export const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.header,
  body: JSON.stringify({
    name,
    about
  })
})  
  .then(res => {
    return checkResult(res)
  })
  .finally (res => {
    renderLoading(false, submitButton)
  }); 
}

export const updateProfileAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.header,
  body: JSON.stringify({
    avatar: link
  })
}) 
  .then(res => {
    return checkResult(res)
  })
  .finally (res => {
    renderLoading(false, submitAvatarButton)
  });
}

export const addLike = (card_id) => {
  return fetch(`${config.baseUrl}/cards/likes/${card_id}`, {
    method: 'PUT',
    headers: config.header
  })
  .then(res => {
    return checkResult(res)
  });
}

export const deleteLike = (card_id) => {
  return fetch(`${config.baseUrl}/cards/likes/${card_id}`, {
    method: 'DELETE',
    headers: config.header
  })
  .then(res => {
    return checkResult(res)
  });
}

getProfile();
