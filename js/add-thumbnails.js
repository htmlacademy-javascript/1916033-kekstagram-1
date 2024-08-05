import {onPicturesContainerClick, gallareyTemplate} from './search-elements.js';

const addThumbnails = (({id, url, description, likes, comments}) => {
  const thumbnail = gallareyTemplate.cloneNode(true);
  thumbnail.dataset.pictureId = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  onPicturesContainerClick.appendChild(thumbnail);
});

export{addThumbnails};
