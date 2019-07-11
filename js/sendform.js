'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var bodyElement = document.querySelector('body');
  var successSampleMessageElement = document.querySelector('#success');
  var errorSampleMessageElement = document.querySelector('#error');
  var cloneGoodMessageElement = successSampleMessageElement.content.cloneNode(true);
  var cloneBadMessageElement = errorSampleMessageElement.content.cloneNode(true);
  var goodMessageElement = cloneGoodMessageElement.querySelector('.success');
  var badMessageElement = cloneBadMessageElement.querySelector('.error');
  var successButtonElement = goodMessageElement.querySelector('.success__button');
  var successInnerElement = goodMessageElement.querySelector('.success__inner');
  var successTitleElement = goodMessageElement.querySelector('.success__title');
  var errorInnerElement = badMessageElement.querySelector('.error__inner');
  var errorTitleElement = badMessageElement.querySelector('.error__title');
  var errorButtonsBlockElement = badMessageElement.querySelector('.error__buttons');
  var mainElement = document.querySelector('main');
  var formElement = document.querySelector('.img-upload__form');
  var hashtagFieldElement = document.querySelector('.text__hashtags');
  var submitBtnElement = document.querySelector('.img-upload__submit');
  var backend = window.backend;
  var onSubmitValidate = window.onSubmitValidate;
  var closePopup = window.closePopup;

  window.addEventListener('load', function () {
    goodMessageElement.classList.add('visually-hidden');
    badMessageElement.classList.add('visually-hidden');
    mainElement.appendChild(goodMessageElement);
    mainElement.appendChild(badMessageElement);
  });

  var onBodyClick = function (e) {
    if (e.target !== successInnerElement && e.target !== errorInnerElement && e.target !== successTitleElement && e.target !== errorTitleElement) {
      closePopupMessage();
    }
  };

  var closePopupMessage = function () {
    if (!goodMessageElement.classList.contains('visually-hidden')) {
      goodMessageElement.classList.add('visually-hidden');
    }

    if (!badMessageElement.classList.contains('visually-hidden')) {
      badMessageElement.classList.add('visually-hidden');
    }

    document.removeEventListener('keydown', onMessageEscPress);
    bodyElement.removeEventListener('click', onBodyClick);
  };

  var onMessageEscPress = function (e) {
    if (e.keyCode === ESC_KEYCODE) {
      closePopupMessage();
    }
  };

  var openSuccessPopup = function () {
    goodMessageElement.classList.remove('visually-hidden');
    document.addEventListener('keydown', onMessageEscPress);
    bodyElement.addEventListener('click', onBodyClick);
  };

  var openErrorPopup = function () {
    badMessageElement.classList.remove('visually-hidden');
    document.addEventListener('keydown', onMessageEscPress);
    bodyElement.addEventListener('click', onBodyClick);
  };

  successButtonElement.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      closePopupMessage();
    }
  });

  successButtonElement.addEventListener('click', function (e) {
    e.preventDefault();
    closePopupMessage();
  });

  errorButtonsBlockElement.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.textContent === 'Попробовать снова') {
      closePopupMessage();
      backend.save(new FormData(formElement), sendSuccessHandler, sendErrorHandler);
    } else {
      closePopupMessage();
    }
  });

  errorButtonsBlockElement.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      if (e.target.textContent === 'Попробовать снова') {
        closePopupMessage();
        backend.save(new FormData(formElement), sendSuccessHandler, sendErrorHandler);
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

  submitBtnElement.addEventListener('click', function () {
    onSubmitValidate();
  });

  formElement.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!hashtagFieldElement.validationMessage) {
      backend.save(new FormData(formElement), sendSuccessHandler, sendErrorHandler);
      closePopup();
    }
  });

})();
