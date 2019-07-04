'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var createCommentsBlock = window.createCommentsBlock;

  var cancelBigPicture = document.querySelector('.big-picture__cancel');
  var bigPic = document.querySelector('.big-picture');
  var body = document.querySelector('body');
  var commentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  var onBigPictureEscPress = function (e) {
    if (e.keyCode === ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var showBigPicture = function (pictureData) {
    bigPic.querySelector('.big-picture__img img').src = pictureData.url;
    bigPic.querySelector('.likes-count').textContent = pictureData.likes;
    bigPic.querySelector('.comments-count').textContent = pictureData.comments.length;
    bigPic.querySelector('.social__caption').textContent = pictureData.description;
    createCommentsBlock(pictureData.comments);
    if (pictureData.comments.length < 5) {
      commentCount.childNodes[0].data = pictureData.comments.length + ' из ';
      commentsLoader.classList.add('visually-hidden');
      commentCount.classList.add('visually-hidden');
    } else {
      commentCount.childNodes[0].data = '5 из ';
    }

    body.classList = 'modal-open';
    bigPic.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    bigPic.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
    document.querySelector('.img-upload__input').value = '';
    body.classList = '';
    commentsLoader.classList.remove('visually-hidden');
    commentCount.classList.remove('visually-hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  cancelBigPicture.addEventListener('click', function () {
    closeBigPicture();
  });

  cancelBigPicture.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      closeBigPicture();
    }
  });

  window.showBigPicture = showBigPicture;

})();
