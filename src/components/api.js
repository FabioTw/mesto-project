export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  header : {
    authorization: '7fbcd172-bf5b-475f-bf14-ccd6d6f0291e',
    'Content-Type': 'application/json'
  }
}

export class Api {
  constructor(config) {
    this.config = config;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: this.config.header
    })
    .then(res => {
      return this._checkResult(res);
    });
  }

  getInitialCards(elements) {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.header
    })
    .then(res => {
      return this._checkResult(res);
    })
  }

  addCard(name, link){
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.header,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => {
      return this._checkResult(res);
    })
  }

  deleteCard(card_id) {
    return fetch(`${config.baseUrl}/cards/${card_id}`, {
      method: 'DELETE',
      headers: config.header,
    })
    .then(res => {
      return this._checkResult(res);
    });
  }

  updateProfile (name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.header,
    body: JSON.stringify({
      name,
      about
    })
  })  
    .then(res => {
      return this._checkResult(res);
    })
  }

  updateProfileAvatar(link){
    return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.header,
    body: JSON.stringify({
      avatar: link
    })
  }) 
    .then(res => {
      return this._checkResult(res)
    })
  }

  deleteLike(card_id) {
    return fetch(`${config.baseUrl}/cards/likes/${card_id}`, {
      method: 'DELETE',
      headers: config.header
    })
    .then(res => {
      return this._checkResult(res)
    });
  }
  
  addLike = (card_id) => {
    return fetch(`${config.baseUrl}/cards/likes/${card_id}`, {
      method: 'PUT',
      headers: config.header
    })
    .then(res => {
      return this._checkResult(res)
    });
  }
}
