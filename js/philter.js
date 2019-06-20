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

  // var classToSaturation = {
  //   'effects__preview--chrome': 'grayscale(' + intensityIndex + ')',
  //   'effects__preview--sepia': 'sepia(' + intensityIndex + ')',
  //   'effects__preview--marvin': 'invert(' + (intensityIndex * 100) + '%)',
  //   'effects__preview--phobos': 'blur(' + (intensityIndex * 3) + 'px)',
  //   'effects__preview--heat': 'brightness(' + (1 + intensityIndex * 2) + ')',
  //   'effects__preview--none': ''
  // };

  window.changeSaturation = changeSaturation;

})();
