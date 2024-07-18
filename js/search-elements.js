export const gallareyTemplate = document.querySelector('#picture').content.querySelector('.picture');
export const onPicturesContainerElementClick = document.querySelector('.pictures');

export const bigPictureElement = document.querySelector('.big-picture');
export const onBigPictureCloseButtonElementClick = bigPictureElement.querySelector('.big-picture__cancel');
export const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
export const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
export const socialCommentTemplateElement = socialCommentsElement.querySelector('.social__comment');
export const likesCountElement = bigPictureElement.querySelector('.likes-count');
export const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
export const onCommentsLoaderElementClick = bigPictureElement.querySelector('.comments-loader');
export const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
export const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
export const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');


export const imgUploadElement = document.querySelector('.img-upload');
export const imgUploadInputElement = imgUploadElement.querySelector('.img-upload__input');
export const imgUploadOverlayElement = imgUploadElement.querySelector('.img-upload__overlay');
export const imgUploadPreviewContainerElement = imgUploadOverlayElement.querySelector('.img-upload__preview-container');
export const imgUploadPreviewElement = imgUploadPreviewContainerElement.querySelector('.img-upload__preview');
export const previewCloseButtonElement = imgUploadPreviewContainerElement.querySelector('.img-upload__cancel');
export const scaleControlSmallerElement = imgUploadPreviewContainerElement.querySelector('.scale__control--smaller');
export const scaleControlBiggerElement = imgUploadPreviewContainerElement.querySelector('.scale__control--bigger');
export const scaleControlValueElement = imgUploadPreviewContainerElement.querySelector('.scale__control--value');
export const imgUploadEffectLevelElement = imgUploadPreviewContainerElement.querySelector('.img-upload__effect-level');
export const effectLevelValueElement = imgUploadEffectLevelElement.querySelector('.effect-level__value');
export const imgUploadEffectsElement = imgUploadOverlayElement.querySelector('.img-upload__effects');
export const effectLevelSliderElement = imgUploadEffectLevelElement.querySelector('.effect-level__slider');
export const imgUploadFormElement = imgUploadElement.querySelector('.img-upload__form');

export const submitButtonElement = imgUploadFormElement.querySelector('.img-upload__submit');

export const bodyElement = document.querySelector('body');
export const dataErrorTemplate = bodyElement.querySelector('#data-error').content;
export const templateSuccess = bodyElement.querySelector('#success').content;
export const templateError = bodyElement.querySelector('#error').content;

export const textHashtagsElement = imgUploadFormElement.querySelector('.text__hashtags');
export const textCommentsElement = imgUploadFormElement.querySelector('.text__description');
