'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var CHANGE_SIZE_STEP = 25;
  var SIZE_MAX = 100;

  var imageSizeElement = document.querySelector('.scale__control--value');
  var imageWrapElement = document.querySelector('.img-upload__preview');
  var reduceImageSizeElement = document.querySelector('.scale__control--smaller');
  var increaseImageSizeElement = document.querySelector('.scale__control--bigger');

  var reduceSize = function () {
    var imageSizeValue = parseInt(imageSizeElement.value, 10);
    if (imageSizeValue > CHANGE_SIZE_STEP) {
      imageSizeElement.value = imageSizeValue - CHANGE_SIZE_STEP + '%';
      imageWrapElement.style.transform = 'scale(0.' + (imageSizeValue - CHANGE_SIZE_STEP) + ')';
    }
  };

  var increaseSize = function () {
    var imageSizeValue = parseInt(imageSizeElement.value, 10);
    if (imageSizeValue < SIZE_MAX) {
      imageSizeElement.value = imageSizeValue + CHANGE_SIZE_STEP + '%';
      imageWrapElement.style.transform = 'scale(' + (imageSizeValue + CHANGE_SIZE_STEP) / SIZE_MAX + ')';
    }
  };

  reduceImageSizeElement.addEventListener('click', function () {
    reduceSize();
  });

  reduceImageSizeElement.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      reduceSize();
    }
  });

  increaseImageSizeElement.addEventListener('click', function () {
    increaseSize();
  });

  increaseImageSizeElement.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      increaseSize();
    }
  });

})();
