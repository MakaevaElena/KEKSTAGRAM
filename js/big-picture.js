import { onBigPictureEscKeyDown } from './utils.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const pictureCloseButton = document.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loadComments = bigPicture.querySelector('.comments-loader');
const socialFooterText = bigPicture.querySelector('.social__footer-text');

let commentsCount = COMMENTS_STEP;
let currentComments = [];

const addComments = () => {
  socialComments.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  const commentsSelected = currentComments.slice(0, commentsCount);

  if (currentComments.length <= COMMENTS_STEP || commentsCount >= currentComments.length) {
    loadComments.classList.add('hidden');
  } else {
    loadComments.classList.remove('hidden');
  }

  socialCommentsCount.textContent = `${commentsCount} из ${currentComments.length} комментариев`;

  const commentFragment = document.createDocumentFragment();

  commentsSelected.forEach((comment) => {
    const newComment = document.createElement('li');
    const imgComment = document.createElement('img');
    const textComment = document.createElement('p');
    newComment.classList.add('social__comment');
    imgComment.classList.add('social--picture');
    textComment.classList.add('social__text');
    imgComment.src = comment.avatar;
    imgComment.alt = comment.name;
    textComment.textContent = comment.message;
    newComment.appendChild(imgComment);
    newComment.appendChild(textComment);

    commentFragment.appendChild(newComment);
  });

  socialComments.appendChild(commentFragment);
};

const onloadCommentsButtonClick = () => {
  commentsCount += COMMENTS_STEP;
  addComments();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsCount = COMMENTS_STEP;
  currentComments = [];
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
  loadComments.removeEventListener('click', onloadCommentsButtonClick);
  socialFooterText.value = '';
};

const onCloseBigPictureClick = () => {
  closeBigPicture();
  pictureCloseButton.removeEventListener('click', onCloseBigPictureClick);
};

const showBigPicture = (url, comments, likes, description) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;

  currentComments = comments;
  addComments();

  loadComments.addEventListener('click', onloadCommentsButtonClick);
  pictureCloseButton.addEventListener('click', onCloseBigPictureClick);
};

export {showBigPicture, closeBigPicture};
