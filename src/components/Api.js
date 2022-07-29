
export default class Api {
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
    return fetch(`${this.config.baseUrl}/users/me`, {
      headers: this.config.header
    })
    .then(res => {
      return this._checkResult(res);
    });
  }

  getInitialCards() {
    return fetch(`${this.config.baseUrl}/cards`, {
      headers: this.config.header
    })
    .then(res => {
      return this._checkResult(res);
    })
  }

  addCard(name, link){
    return fetch(`${this.config.baseUrl}/cards`, {
      method: 'POST',
      headers: this.config.header,
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
    return fetch(`${this.config.baseUrl}/cards/${card_id}`, {
      method: 'DELETE',
      headers: this.config.header,
    })
    .then(res => {
      return this._checkResult(res);
    });
  }

  updateProfile (name, about) {
    return fetch(`${this.config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this.config.header,
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
    return fetch(`${this.config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this.config.header,
    body: JSON.stringify({
      avatar: link
    })
  }) 
    .then(res => {
      return this._checkResult(res)
    })
  }

  deleteLike(card_id) {
    return fetch(`${this.config.baseUrl}/cards/likes/${card_id}`, {
      method: 'DELETE',
      headers: this.config.header
    })
    .then(res => {
      return this._checkResult(res)
    });
  }
  
  addLike = (card_id) => {
    return fetch(`${this.config.baseUrl}/cards/likes/${card_id}`, {
      method: 'PUT',
      headers: this.config.header
    })
    .then(res => {
      return this._checkResult(res)
    });
  }
}
