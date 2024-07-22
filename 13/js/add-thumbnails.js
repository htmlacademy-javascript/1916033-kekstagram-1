import {onPicturesContainerElementClick, gallareyTemplate} from './search-elements.js';

const addThumbnails = (({id, url, likes, comments}) => {
  const thumbnail = gallareyTemplate.cloneNode(true);
  thumbnail.dataset.pictureId = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  onPicturesContainerElementClick.appendChild(thumbnail);
});

export{addThumbnails};
