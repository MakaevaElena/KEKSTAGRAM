import {renderPhotos} from './pictures.js';
import './pictures.js';
import './form.js';
import './hashtags.js';
import './effects.js';
import {request} from './fetch.js';
import './filters.js';
import './messages.js';
import './own-photos.js';

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderPhotos(data);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const onFail = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.left = 0;
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.fontSize = '30px';
  messageAlert.style.backgroundColor = 'red';
  messageAlert.style.textAlign = 'center';
  messageAlert.textContent = 'Ошибка загрузки фотографий';
  document.body.append(messageAlert);
};

request(onSuccess, onFail, 'GET');

export {photos};
