'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var CHANGE_SIZE_STEP = 25;
  var SIZE_MAX = 100;

  var imageSize = document.querySelector('.scale__control--value');
  var imageWrap = document.querySelector('.img-upload__preview');
  var reduce = document.querySelector('.scale__control--smaller');
  var increase = document.querySelector('.scale__control--bigger');

  var reduceSize = function () {
    var imageSizeValue = parseInt(imageSize.value, 10);
    if (imageSizeValue > CHANGE_SIZE_STEP) {
      imageSize.value = imageSizeValue - CHANGE_SIZE_STEP + '%';
      imageWrap.style.transform = 'scale(0.' + (imageSizeValue - CHANGE_SIZE_STEP) + ')';
    }
  };

  var increaseSize = function () {
    var imageSizeValue = parseInt(imageSize.value, 10);
    if (imageSizeValue < SIZE_MAX) {
      imageSize.value = imageSizeValue + CHANGE_SIZE_STEP + '%';
      imageWrap.style.transform = 'scale(' + (imageSizeValue + CHANGE_SIZE_STEP) / SIZE_MAX + ')';
    }
  };

  reduce.addEventListener('click', function () {
    reduceSize();
  });

  reduce.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      reduceSize();
    }
  });

  increase.addEventListener('click', function () {
    increaseSize();
  });

  increase.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      increaseSize();
    }
  });

})();
