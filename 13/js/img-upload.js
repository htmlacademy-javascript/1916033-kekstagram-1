import {closeElement, showElement,isEscapeKey, modalOpenAdd, modalOpenRemove} from './util.js';
import * as SE from './search-elements.js';
import {pristine} from './validation.js';

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const PERCENT = '%';

noUiSlider.create (SE.effectLevelSliderElement, {
  range: {
    min: 0,
    max:100
  },
  start: 0,
  connect: 'lower'
});
const filters = {
  'none': {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    apply: () => 'none'
  },
  'chrome': {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    apply: (value) => `grayscale(${value})`
  },
  'sepia': {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    apply: (value) => `sepia(${value})`
  },
  'marvin': {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    apply: (value) => `invert(${value}%)`
  },
  'phobos': {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    apply: (value) => `blur(${value}px)`
  },
  'heat': {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    apply: (value) => `brightness(${value})`
  }
};
const resetInputFile = () => {
  SE.imgUploadInputElement.value = '';
};

const onScaleDownClick = () => {
  let currentValue = parseInt(SE.scaleControlValueElement.value, 10);
  if (currentValue > SCALE_MIN) {
    currentValue -= SCALE_STEP;
    SE.scaleControlValueElement.value = currentValue + PERCENT;
    SE.imgUploadPreviewElement.style.transform = `scale(${currentValue / 100})`;
  }
};
const onScaleUpClick = () => {
  let currentValue = parseInt(SE.scaleControlValueElement.value, 10);
  if (currentValue < SCALE_MAX) {
    currentValue += SCALE_STEP;
    SE.scaleControlValueElement.value = currentValue + PERCENT;
    SE.imgUploadPreviewElement.style.transform = `scale(${currentValue / 100})`;
  }
};

const onUpdateSliderChange = (evt) => {
  const effect = evt.target.value;
  const isNoneEffect = effect === 'none';
  if (isNoneEffect) {
    closeElement(SE.imgUploadEffectLevelElement);
  } else {
    showElement(SE.imgUploadEffectLevelElement);
  }

  const {range, start, step, apply} = filters[effect];

  if (!SE.effectLevelSliderElement.noUiSlider) {
    noUiSlider.create(SE.effectLevelSliderElement, {
      start,
      range,
      step,
      connect: 'lower',
    });
  } else {

    SE.effectLevelSliderElement.noUiSlider.updateOptions({
      range,
      start: start,
      step,
    });
  }

  SE.effectLevelSliderElement.noUiSlider.on('update', (values, handle) => {
    const value = parseFloat(values[handle]);
    SE.imgUploadPreviewElement.style.filter = apply(value);
    SE.effectLevelValueElement.value = value.toFixed(1);
  });
};

const resetForm = () => {
  SE.imgUploadFormElement.reset();
  pristine.reset();
  SE.scaleControlValueElement.value = SCALE_MAX + PERCENT;
  SE.imgUploadPreviewElement.style.transform = 'scale(1)';
  document.querySelector('.effects__radio[value="none"]').checked = true;
  SE.imgUploadPreviewElement.style.filter = '';
  SE.effectLevelSliderElement.value = 'none';
};

const onUploadChange = () => {
  showElement(SE.imgUploadOverlayElement);
  closeElement(SE.imgUploadEffectLevelElement);
  modalOpenAdd();
  document.addEventListener('keydown', onEscKeyDown);
};

const onUploadCloseClick = () => {
  closeElement(SE.imgUploadOverlayElement);
  resetForm();
  resetInputFile();
  modalOpenRemove();
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown (evt) {
  if (isEscapeKey(evt)) {
    onUploadCloseClick();
  }
}

const initUploadEvents = () => {
  SE.imgUploadInputElement.addEventListener('change', onUploadChange);
  SE.previewCloseButtonElement.addEventListener('click',onUploadCloseClick);
  SE.scaleControlSmallerElement.addEventListener('click', onScaleDownClick);
  SE.scaleControlBiggerElement.addEventListener('click', onScaleUpClick);
  SE.imgUploadEffectsElement.addEventListener('change', onUpdateSliderChange);
};

initUploadEvents();

export {onUploadCloseClick};