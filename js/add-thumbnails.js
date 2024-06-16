import { similarPhotos } from './data.js';
import { openBigPicture } from './big-photo-mode.js';

function generateSmallPhoto() {
  const galleryTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  similarPhotos.forEach(({ id, url, description, comments, likes }) => {
    const thumbnail = galleryTemplate.cloneNode(true);
    thumbnail.dataset.pictureId = id;
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.alt = description;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);

  picturesContainer.addEventListener('click', (evt) => {
    const currentThumbnailPicture = evt.target.closest('.picture');
    if (currentThumbnailPicture) {
      openBigPicture(currentThumbnailPicture.dataset.pictureId);
    }
  });
}
export {generateSmallPhoto};
