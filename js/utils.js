import {closeBigPicture} from './big-picture.js';

const DELAY = 500;
const checkStringLength = (string, length) => string.length <= length;

const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, DELAY);
  };
};

const shuffleArray = (array) => {
  for (let indexOne = array.length - 1; indexOne > 0; indexOne--) {
    const indexTwo = Math.floor(Math.random() * (indexOne + 1));
    [array[indexOne], array[indexTwo]] = [array[indexTwo], array[indexOne]];
  }
  return array;
};

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onBigPictureEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
};

export {debounce, shuffleArray, checkStringLength, isEscapeKey, onBigPictureEscKeyDown};
