'use strict';

(function () {

  var imageWrap = document.querySelector('.img-upload__preview');

  var changeSaturation = function (intensityIndex) {

    var classToSaturation = {
      'effects__preview--chrome': 'grayscale(' + intensityIndex + ')',
      'effects__preview--sepia': 'sepia(' + intensityIndex + ')',
      'effects__preview--marvin': 'invert(' + (intensityIndex * 100) + '%)',
      'effects__preview--phobos': 'blur(' + (intensityIndex * 3) + 'px)',
      'effects__preview--heat': 'brightness(' + (1 + intensityIndex * 2) + ')',
      'effects__preview--none': 'none'
    };

    imageWrap.classList.forEach(function (className) {
      var result = classToSaturation[className];

      if (result) {
        imageWrap.style.filter = result;
      }
    });
  };

  window.changeSaturation = changeSaturation;
})();
