'use strict';

(function () {
  var slider = document.querySelector('.effect-level');
  var sliderLine = slider.querySelector('.effect-level__line');
  var sliderPin = slider.querySelector('.effect-level__pin');
  var sliderLevel = slider.querySelector('.effect-level__depth');
  var imageWrap = document.querySelector('.img-upload__preview');
  var effects = document.querySelector('.effects__list');

  var initSlider = function () {

    effects.addEventListener('click', function (e) {
      sliderPin.style.left = '100%';
      sliderLevel.style.width = '100%';

      if (effects.querySelector('#effect-none').checked) {
        slider.style.visibility = 'hidden';
      } else {
        slider.style.visibility = 'visible';
      }

      if (e.target.classList.contains('effects__preview')) {
        imageWrap.classList = 'img-upload__preview';
        imageWrap.classList.add(e.target.classList[1]);
        window.changeSaturation(1);
      }
    });

    sliderPin.addEventListener('mousedown', function (e) {
      e.preventDefault();
      var startCoords = e.clientX;

      var onMouseMove = function (moveE) {
        moveE.preventDefault();

        var shift = startCoords - moveE.clientX;
        var sliderNumber = (sliderPin.offsetLeft / sliderLine.offsetWidth).toFixed(1);

        startCoords = moveE.clientX;

        if (sliderPin.offsetLeft - shift >= 0 && sliderPin.offsetLeft - shift <= sliderLine.offsetWidth) {
          sliderPin.style.left = (sliderPin.offsetLeft - shift) + 'px';
          sliderLevel.style.width = (sliderPin.offsetLeft) + 'px';
        }

        window.changeSaturation(sliderNumber);
      };

      var onMouseUp = function (upE) {
        upE.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  initSlider();
})();
