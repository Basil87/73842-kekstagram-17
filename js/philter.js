'use strict';

(function () {

  var imageWrap = document.querySelector('.img-upload__preview');

  var changeSaturation = function (intensityIndex) {
    if (imageWrap.classList.contains('effects__preview--chrome')) {
      imageWrap.style.filter = 'grayscale(' + intensityIndex + ')';
    } else if (imageWrap.classList.contains('effects__preview--sepia')) {
      imageWrap.style.filter = 'sepia(' + intensityIndex + ')';
    } else if (imageWrap.classList.contains('effects__preview--marvin')) {
      imageWrap.style.filter = 'invert(' + (intensityIndex * 100) + '%)';
    } else if (imageWrap.classList.contains('effects__preview--phobos')) {
      imageWrap.style.filter = 'blur(' + (intensityIndex * 3) + 'px)';
    } else if (imageWrap.classList.contains('effects__preview--heat')) {
      imageWrap.style.filter = 'brightness(' + (1 + intensityIndex * 2) + ')';
    } else if (imageWrap.classList.contains('effects__preview--chrome')) {
      imageWrap.style.filter = 'grayscale(' + intensityIndex + ')';
    } else if (imageWrap.classList.contains('effects__preview--none')) {
      imageWrap.style.filter = '';
    }
  };

  window.initSlider(changeSaturation);

})();
