'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var upload = document.querySelector('#upload-file');
  var cancelPopup = document.querySelector('.img-upload__cancel');
  var overlay = document.querySelector('.img-upload__overlay');
  var imageUploadScale = document.querySelector('.img-upload__scale');
  var imageSize = document.querySelector('.scale__control--value');
  var slider = document.querySelector('.effect-level');

  var closePopup = function () {
    upload.value = '';
    overlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (e) {
    if (e.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    overlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    document.querySelector('.scale').style.visibility = 'hidden';
    slider.style.visibility = 'hidden';
    imageUploadScale.style.visibility = 'visible';
    imageSize.value = '100%';
  };

  upload.addEventListener('change', function (e) {
    e.preventDefault();
    openPopup();
  });

  cancelPopup.addEventListener('click', function () {
    closePopup();
  });

  cancelPopup.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

})();
