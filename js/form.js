'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var upload = document.querySelector('#upload-file');
  var cancelPopup = document.querySelector('.img-upload__cancel');
  var overlay = document.querySelector('.img-upload__overlay');
  var imageUploadScale = document.querySelector('.img-upload__scale');
  var imageSize = document.querySelector('.scale__control--value');
  var imageWrap = document.querySelector('.img-upload__preview');
  var preview = document.querySelector('.img-upload__preview img');
  var slider = document.querySelector('.effect-level');
  var effectsPreview = document.querySelectorAll('.effects__preview');
  var textDescription = document.querySelector('.text__description');
  var hashtag = document.querySelector('.text__hashtags');

  var closePopup = function () {
    upload.value = '';
    overlay.classList.add('hidden');
    hashtag.value = '';
    textDescription.value = '';
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (e) {
    if (e.keyCode === ESC_KEYCODE && textDescription !== document.activeElement && hashtag !== document.activeElement) {
      closePopup();
    }
  };

  var openPopup = function () {
    overlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    document.querySelector('.scale').style.visibility = 'hidden';
    document.querySelector('#effect-none').checked = 'checked';
    slider.style.visibility = 'hidden';
    imageUploadScale.style.visibility = 'visible';
    imageSize.value = '100%';
    imageWrap.style.filter = 'none';
  };

  upload.addEventListener('change', function (e) {
    e.preventDefault();
    var file = upload.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        effectsPreview.forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });
        openPopup();
      });

      reader.readAsDataURL(file);
    }
  });

  cancelPopup.addEventListener('click', function () {
    closePopup();
  });

  cancelPopup.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  window.closePopup = closePopup;

})();
