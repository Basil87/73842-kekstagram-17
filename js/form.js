'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadBtnElement = document.querySelector('#upload-file');
  var cancelPopupElement = document.querySelector('.img-upload__cancel');
  var imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
  var imageUploadScaleElement = document.querySelector('.img-upload__scale');
  var imageSizeValueElement = document.querySelector('.scale__control--value');
  var imagePreviewElement = document.querySelector('.img-upload__preview');
  var imageInPreviewElement = document.querySelector('.img-upload__preview img');
  var sliderElement = document.querySelector('.effect-level');
  var effectsPreviewElement = document.querySelectorAll('.effects__preview');
  var textDescriptionElement = document.querySelector('.text__description');
  var hashtagFieldElement = document.querySelector('.text__hashtags');

  var closePopup = function () {
    uploadBtnElement.value = '';
    imageUploadOverlayElement.classList.add('hidden');
    hashtagFieldElement.value = '';
    textDescriptionElement.value = '';
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (e) {
    if (e.keyCode === ESC_KEYCODE && textDescriptionElement !== document.activeElement && hashtagFieldElement !== document.activeElement) {
      closePopup();
    }
  };

  var openPopup = function () {
    imageUploadOverlayElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    document.querySelector('.scale').style.visibility = 'hidden';
    document.querySelector('#effect-none').checked = 'checked';
    sliderElement.style.visibility = 'hidden';
    imageUploadScaleElement.style.visibility = 'visible';
    imageSizeValueElement.value = '100%';
    imagePreviewElement.style.filter = 'none';
  };

  uploadBtnElement.addEventListener('change', function (e) {
    e.preventDefault();
    var file = uploadBtnElement.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imageInPreviewElement.src = reader.result;
        effectsPreviewElement.forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });
        openPopup();
      });

      reader.readAsDataURL(file);
    }
  });

  cancelPopupElement.addEventListener('click', function () {
    closePopup();
  });

  cancelPopupElement.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  window.closePopup = closePopup;

})();
