import {bodyElement} from './search-elements.js';
import {isEscapeKey} from './util.js';

const getExistingElement = () => document.querySelector('.success') || document.querySelector('.error');

const closeNotificationClick = (evt) => {
  getExistingElement();
  const closeButton = getExistingElement().querySelector('button');
  if (evt.target === getExistingElement() || evt.target === closeButton){
    getExistingElement().remove();
    removeNotificationListeners();
  }
};
const closeNotificationKeydown = (evt) => {
  evt.stopPropagation();
  getExistingElement();
  if (isEscapeKey(evt)) {
    getExistingElement().remove();
    removeNotificationListeners();
  }
};

function removeNotificationListeners () {
  bodyElement.removeEventListener('click', closeNotificationClick);
  bodyElement.removeEventListener('keydown', closeNotificationKeydown);
}

const appendNotification = (template, trigger = null) => {
  if (trigger) {
    trigger();
  }
  const notificationNode = template.cloneNode(true);
  bodyElement.append(notificationNode);
  bodyElement.addEventListener('click', closeNotificationClick);
  bodyElement.addEventListener('keydown', closeNotificationKeydown);
};

export {appendNotification};
