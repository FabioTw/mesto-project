export default class UserInfo {
  constructor(name, description, avatar) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
      avatar: this._avatar.src,
      profileId: this._profileId
    };
  }

  setUserInfo({name = null, about = null, avatar = null, _id = null}) {
    if (name) {
      this._name.textContent = name;
    }
    if (about) {
      this._description.textContent = about;
    }
    if (avatar) {
      this._avatar.src = avatar;
    }
    if (_id) {
      this._profileId = String(_id);
    }
  }
}