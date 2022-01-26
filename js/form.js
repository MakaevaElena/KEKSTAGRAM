import {isEscapeKey} from './utils.js';
import {image,effects} from './effects.js';
import {inputHashtag} from './hashtags.js';

const ZoomValue = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const body = document.querySelector('body');
const formUpload = body.querySelector('.img-upload__form');
const overlay = body.querySelector('.img-upload__overlay');
const fileUpload = body.querySelector('#upload-file');
const formUploadClose = body.querySelector('#upload-cancel');
const scaleControllSmallerButton = body.querySelector('.scale__control--smaller');
const scaleControllBiggerButton = body.querySelector('.scale__control--bigger');
const scaleControllValue = body.querySelector('.scale__control--value');
const imagePreview = body.querySelector('.img-upload__preview');

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imagePreview.style.transform = '';
  imagePreview.className = 'img-upload__preview';
  imagePreview.style.filter = 'none';
  formUpload.reset();
};

const onCloseFormEscKeyDown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    closeForm();
    document.removeEventListener('keydown', onCloseFormEscKeyDown);
  }
};

const openForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  image.style.filter = effects.none();
  document.addEventListener('keydown', onCloseFormEscKeyDown);
  inputHashtag.style.border = 'none';
};

fileUpload.addEventListener('change', () => {
  openForm();
});

formUploadClose.addEventListener('click', () => {
  closeForm();
});

scaleControllSmallerButton.addEventListener('click', () => {
  let size = parseInt(scaleControllValue.value, 10);
  if (size === ZoomValue.MIN) {
    return;
  }
  size -= ZoomValue.STEP;
  scaleControllValue.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
});

scaleControllBiggerButton.addEventListener('click', () => {
  let size = parseInt(scaleControllValue.value, 10);
  if (size === ZoomValue.MAX) {
    return;
  }
  size += ZoomValue.STEP;
  scaleControllValue.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
});

export { closeForm};
