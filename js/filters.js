import { debounce, shuffleArray } from './utils.js';
import { renderPhotos, removePictures } from './pictures.js';
import { photos } from './main.js';

const COUNT_OF_FILTER = 10;
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const filterButtons = imgFiltersForm.querySelectorAll('button');

const availableFilters = {
  'filter-default': () => photos.slice(),
  'filter-random': () => shuffleArray(photos).slice(0, COUNT_OF_FILTER),
  'filter-discussed': () => {
    const discussedPhotos = photos.slice().sort((firstElement, secondElement) => secondElement.comments.length - firstElement.comments.length);
    return discussedPhotos;
  },
};

const onButtonClick = debounce((evt) => {
  const selected = imgFiltersForm.querySelector('.img-filters__button--active');
  if (selected) {
    selected.classList.remove('img-filters__button--active');
  }

  evt.target.classList.add('img-filters__button--active');
  removePictures();
  renderPhotos(availableFilters[evt.target.id]());
});

filterButtons.forEach((button) => {
  button.addEventListener('click', onButtonClick);
});
