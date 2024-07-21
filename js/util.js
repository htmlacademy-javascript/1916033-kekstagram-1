import {bodyElement, dataErrorTemplate, imgFiltersInactiveElement} from './search-elements.js';

const TIME_OUT = 5000;

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const modalOpenAdd = () => {
  bodyElement.classList.add('modal-open');
};
export const modalOpenRemove = () => {
  bodyElement.classList.remove('modal-open');
};
export const closeElement = (element) => element.classList.add('hidden');
export const showElement = (element) => element.classList.remove('hidden');

export const showErrorMessage = () => {
  const errorMessage = dataErrorTemplate.cloneNode(true);
  bodyElement.append(errorMessage);
  const dataErrorMessage = bodyElement.querySelector('.data-error');
  setTimeout(() => {
    dataErrorMessage.remove();
  }, TIME_OUT);
};

export const opacityOne = () => {
  imgFiltersInactiveElement.style.opacity = '1';
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
