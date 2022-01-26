import { closeForm } from './form.js';
import { isEscapeKey } from './utils.js';
import { request } from './fetch.js';

const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const formUpload = document.querySelector('.img-upload__form');

const closePopup = () => {
  const popup =  document.querySelector('.error') || document.querySelector('.success');
  popup.remove();
};

const onEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    closePopup();
  }
};

const onPopupClick = (evt) => {
  if (!evt.target.classList.contains('success__inner') && !evt.target.classList.contains('error__inner')) {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', onEscKeydown);
  }
};

const showMessage = (message) => {
  message.addEventListener('click', onPopupClick);
  document.body.appendChild(message);
  document.addEventListener('keydown', onEscKeydown, {once: true});
};

const showErrorMessage = () => {
  const messageFragment = errorMessage.cloneNode(true);
  showMessage(messageFragment);
};

const showSuccessMessage = () => {
  const messageFragment = successMessage.cloneNode(true);
  showMessage(messageFragment);
};

const onSuccess = () => {
  closeForm();
  showSuccessMessage();
};
const onFail = () => {
  showErrorMessage();
  closeForm();
};

formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  request(onSuccess, onFail, 'POST', formData);
});
