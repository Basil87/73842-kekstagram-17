'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var body = document.querySelector('body');
  var successSampleMessage = document.querySelector('#success');
  var errorSampleMessage = document.querySelector('#error');
  var cloneGoodMessage = successSampleMessage.content.cloneNode(true);
  var cloneBadMessage = errorSampleMessage.content.cloneNode(true);
  var goodMessage = cloneGoodMessage.querySelector('.success');
  var badMessage = cloneBadMessage.querySelector('.error');
  var successButton = goodMessage.querySelector('.success__button');
  var successInner = goodMessage.querySelector('.success__inner');
  var successTitle = goodMessage.querySelector('.success__title');
  var errorInner = badMessage.querySelector('.error__inner');
  var errorTitle = badMessage.querySelector('.error__title');
  var errorButtonsBlock = badMessage.querySelector('.error__buttons');
  var main = document.querySelector('main');
  var form = document.querySelector('.img-upload__form');
  var hashtag = document.querySelector('.text__hashtags');
  var backend = window.backend;
  var onSubmitValidate = window.onSubmitValidate;
  var closePopup = window.closePopup;

  window.addEventListener('load', function () {
    goodMessage.classList.add('visually-hidden');
    badMessage.classList.add('visually-hidden');
    main.appendChild(goodMessage);
    main.appendChild(badMessage);
  });

  var closeToBodyClick = function (e) {
    if (e.target !== successInner && e.target !== errorInner && e.target !== successTitle && e.target !== errorTitle) {
      closePopupMessage();
    }
  };

  var closePopupMessage = function () {
    if (!goodMessage.classList.contains('visually-hidden')) {
      goodMessage.classList.add('visually-hidden');
    }

    if (!badMessage.classList.contains('visually-hidden')) {
      badMessage.classList.add('visually-hidden');
    }

    document.removeEventListener('keydown', onMessageEscPress);
    body.removeEventListener('click', closeToBodyClick);
  };

  var onMessageEscPress = function (e) {
    if (e.keyCode === ESC_KEYCODE) {
      closePopupMessage();
    }
  };

  var openSuccessPopup = function () {
    goodMessage.classList.remove('visually-hidden');
    document.addEventListener('keydown', onMessageEscPress);
    body.addEventListener('click', closeToBodyClick);
  };

  var openErrorPopup = function () {
    badMessage.classList.remove('visually-hidden');
    document.addEventListener('keydown', onMessageEscPress);
  };

  successButton.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      closePopupMessage();
    }
  });

  successButton.addEventListener('click', function (e) {
    e.preventDefault();
    closePopupMessage();
  });

  errorButtonsBlock.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.textContent === 'Попробовать снова') {
      closePopupMessage();
      backend.save(new FormData(form), sendSuccessHandler, sendErrorHandler);
    } else {
      closePopupMessage();
    }
  });

  errorButtonsBlock.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      if (e.target.textContent === 'Попробовать снова') {
        closePopupMessage();
        backend.save(new FormData(form), sendSuccessHandler, sendErrorHandler);
      } else {
        closePopupMessage();
      }
    }
  });

  // отправка формы

  var sendSuccessHandler = function () {
    openSuccessPopup();
  };

  var sendErrorHandler = function () {
    openErrorPopup();
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    onSubmitValidate();
    if (hashtag.style.outline !== '2px solid red') {
      backend.save(new FormData(form), sendSuccessHandler, sendErrorHandler);
      closePopup();
    }
  });

})();
