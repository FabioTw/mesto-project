export default class UserInfo {
  constructor(name, description, avatar, getUserInfo) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
    this._getUserInfo = getUserInfo;
  }

  getUserInfo() {
    return this._getUserInfo();
  }

  setUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._description.textContent = about;
    this._avatar.src = avatar;
    this._profileId = String(_id);
  }

  getProfileId() {
    return this._profileId;
  }
}