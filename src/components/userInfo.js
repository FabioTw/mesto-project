export default class UserInfo {
  constructor(name, description, avatar, getUserInfo) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
    this._getUserInfo = getUserInfo;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
      avatar: this._avatar.src,
      profileId: this._profileId
    };
  }

  setUserInfo({name, about, avatar = null, _id = null}) {
    this._name.textContent = name;
    this._description.textContent = about;
    if (avatar) {
      this._avatar.src = avatar;
    }
    if (_id) {
      this._profileId = String(_id);
    }
  }

}