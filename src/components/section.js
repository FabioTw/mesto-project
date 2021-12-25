import {element} from './variables.js'

export default class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
    this._element = document.querySelector(selector);
  }

  renderer() {
    this._items.forEach(item => {
      this._element.append(this._renderer(item));
    })
  }
  addItem(getElement) {
    this._element.insertBefore(getElement, element);
  }
}