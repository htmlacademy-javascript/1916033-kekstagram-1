import {closeElement, showElement,isEscapeKey, addModalOpen, removeModalOpen} from './util.js';
import * as SE from './search-elements.js';

const COUNT_STEP = 5;

let newPhotos = [];
let currentCount = 0;
let globalComments = [];


const hideLoadMoreButton = () => {
  SE.onCommentsLoaderClick.classList.add('hidden');
};
const showLoadMoreButton = () => {
  SE.onCommentsLoaderClick.classList.remove('hidden');
};
const updateBigPictureInfo = (photo) => {
  SE.bigPictureImgElement.src = photo.url;
  SE.likesCountElement.textContent = photo.likes;
  SE.socialCaptionElement.textContent = photo.description;
};

const addComments = (comments) => {
  const fragment = document.createDocumentFragment();
  const commentsToShow = comments.slice(currentCount, currentCount + COUNT_STEP);
  commentsToShow.forEach((comment) => {
    const socialComment = SE.socialCommentTemplateElement.cloneNode(true);
    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.name;
    socialComment.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(socialComment);
  });
  SE.socialCommentsElement.appendChild(fragment);
  currentCount += commentsToShow.length;
  SE.commentShownCountElement.textContent = currentCount;
  if (currentCount >= comments.length) {
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
  }
};

const loadComments = () => {
  addComments(globalComments);
};

const openBigPicture = (pictureId) => {
  SE.socialCommentsElement.innerText = '';
  currentCount = 0;
  const currentPhoto = newPhotos.find((photo) => photo.id === Number(pictureId));
  updateBigPictureInfo(currentPhoto);
  globalComments = currentPhoto.comments;
  SE.commentTotalCountElement.textContent = globalComments.length.toString();
  addComments(globalComments);
  showElement(SE.bigPictureElement);
  addModalOpen();
  document.addEventListener('keydown', onEscKeyDown);
};

const closeButtonClick = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  SE.socialFooterTextElement.value = '';
  closeElement(SE.bigPictureElement);
  removeModalOpen();
  document.removeEventListener('keydown', onEscKeyDown);
};
function onEscKeyDown (evt) {
  if (isEscapeKey(evt)) {
    closeButtonClick();
  }
}

const picturesContainerClick = (evt) => {
  const currentThumbnailPicture = evt.target.closest('.picture');
  if (currentThumbnailPicture){
    openBigPicture(currentThumbnailPicture.dataset.pictureId);
  }
};
const initializeEventListeners = () => {
  SE.onPicturesContainerClick.addEventListener('click', picturesContainerClick);
  SE.onBigPictureCloseClick.addEventListener('click', closeButtonClick);
  SE.commentsLoaderElement.addEventListener('click', loadComments);
};
const initializeGallery = (photos) => {
  newPhotos = photos;
  initializeEventListeners();
};

export {initializeGallery};
