import {closeElement, showElement,isEscapeKey, modalOpenAdd, modalOpenRemove} from './util.js';
import * as SE from './search-elements.js';

const COUNT_STEP = 5;

let newPhotos = [];
let currentCount = 0;
let globalComments = [];


const hideLoadMoreButton = () => {
  SE.onCommentsLoaderElementClick.classList.add('hidden');
};
const showLoadMoreButton = () => {
  SE.onCommentsLoaderElementClick.classList.remove('hidden');
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

const showMoreComments = () => {
  addComments(globalComments);
};

const openBigPicture = (pictureId) => {
  SE.socialCommentsElement.innerText = '';
  currentCount = 0;
  const currentPhoto = newPhotos.find((photo) => photo.id === Number(pictureId));
  updateBigPictureInfo(currentPhoto);
  globalComments = currentPhoto.comments;
  SE.commentTotalCountElement.textContent = globalComments.length;
  addComments(globalComments);
  showElement(SE.bigPictureElement);
  modalOpenAdd();
  document.addEventListener('keydown', onEscKeyDown);
};

const closeBigPicture = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  closeElement(SE.bigPictureElement);
  modalOpenRemove();
  document.removeEventListener('keydown', onEscKeyDown);
};
function onEscKeyDown (evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

const onPicturesContainerClick = (evt) => {
  const currentThumbnailPicture = evt.target.closest('.picture');
  if (currentThumbnailPicture){
    openBigPicture(currentThumbnailPicture.dataset.pictureId);
  }
};
const initaddEventListeners = () => {
  SE.onPicturesContainerElementClick.addEventListener('click', onPicturesContainerClick);
  SE.onBigPictureCloseButtonElementClick.addEventListener('click', closeBigPicture);
  SE.commentsLoaderElement.addEventListener('click', showMoreComments);
};
const initializeGallery = (photos) => {
  newPhotos = photos;
  initaddEventListeners();
};

export {initializeGallery};
