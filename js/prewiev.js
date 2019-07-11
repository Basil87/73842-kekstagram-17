'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var cancelBigPictureElement = document.querySelector('.big-picture__cancel');
  var bigPictureElement = document.querySelector('.big-picture');
  var bodyElement = document.querySelector('body');
  var commentCountElement = document.querySelector('.social__comment-count');
  var commentsLoaderElement = document.querySelector('.comments-loader');
  var createCommentsBlock = window.createCommentsBlock;
  var hideCommentsInfo = window.hideCommentsInfo;

  var onBigPictureEscPress = function (e) {
    if (e.keyCode === ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var showBigPicture = function (pictureData) {
    bigPictureElement.querySelector('.big-picture__img img').src = pictureData.url;
    bigPictureElement.querySelector('.likes-count').textContent = pictureData.likes;
    bigPictureElement.querySelector('.comments-count').textContent = pictureData.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = pictureData.description;
    createCommentsBlock(pictureData.comments);
    if (pictureData.comments.length < 5) {
      hideCommentsInfo();
    } else {
      commentCountElement.childNodes[0].data = '5 из ';
    }

    bodyElement.classList = 'modal-open';
    bigPictureElement.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    bigPictureElement.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
    document.querySelector('.img-upload__input').value = '';
    bodyElement.classList = '';
    document.removeEventListener('keydown', onBigPictureEscPress);
    commentsLoaderElement.classList.remove('visually-hidden');
    commentCountElement.classList.remove('visually-hidden');
  };

  cancelBigPictureElement.addEventListener('click', function () {
    closeBigPicture();
  });

  cancelBigPictureElement.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      closeBigPicture();
    }
  });

  window.showBigPicture = showBigPicture;

})();
