import {myApi} from './variables.js'
export default class UserInfo {
  constructor({name, description}) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    return myApi.getProfile();
  }

  setUserInfo(name, description) {
    return myApi.updateProfile(name, description)
  }
}