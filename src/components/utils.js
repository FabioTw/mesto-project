function closeEscButton (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscButton);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscButton);
}

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.value = 'Сохранение...';
    button.textContent = 'Сохранение...';
  } else {
    button.value = 'Сохранить';
    button.textContent = 'Сохранить';
  }
}

export {openPopup, closePopup, renderLoading};