const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const inputHashtag = document.querySelector('.text__hashtags');

inputHashtag.addEventListener( 'input', () => {
  const invalidMessages = [];

  inputHashtag.setCustomValidity('');

  const inputText = inputHashtag.value.toLowerCase().trim();

  if(!inputText) {
    return;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return;
  }

  const isStartNoHashtag = inputArray.some((item) => item[0] !== '#');
  if (isStartNoHashtag) {
    invalidMessages.push('Хэш-тег должен начинаться с символа #');
  }

  const isOnlyLatticeHashtag = inputArray.some((item) => item === '#');
  if (isOnlyLatticeHashtag) {
    invalidMessages.push('Хэш-тег не может состоять только из одной решётки');
  }

  const isSplitSpaceHashtag = inputArray.some((item) => item.indexOf('#', 1) >= 1);
  if (isSplitSpaceHashtag) {
    invalidMessages.push('Хэш-теги разделяются пробелами');
  }

  const isRepeatHashtag = inputArray.some((item, num, arr) => arr.indexOf(item, num + 1) >= num + 1);
  if(isRepeatHashtag) {
    invalidMessages.push('Один и тот же хэш-тег не может быть использован дважды');
  }

  const isWrongSymbols = inputArray.some((item) => !/^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/.test(item));

  if (isWrongSymbols) {
    invalidMessages.push('Введены недопустимые символы');
  }

  const isLongHashtag = inputArray.some((item) => item.length > MAX_SYMBOLS);
  if (isLongHashtag) {
    invalidMessages.push('Максимальная длина одного хэш-тега 20 символов, включая решётку');
  }
  if (inputArray.length > MAX_HASHTAGS) {
    invalidMessages.push('Нельзя указать больше пяти хэш-тегов');
  }

  if (invalidMessages.length > 0) {
    inputHashtag.setCustomValidity(invalidMessages.join('.\n'));
    inputHashtag.style.border = '2px solid red';
  } else {
    inputHashtag.style.border = 'none';
  }

  inputHashtag.reportValidity();
});

export {inputHashtag};
