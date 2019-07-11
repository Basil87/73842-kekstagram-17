'use strict';

(function () {

  var ENTER_KEYCODE = 13;

  var debounce = window.debounce;
  var backend = window.backend;
  var changeFilter = window.changeFilter;
  var showBigPicture = window.showBigPicture;
  var imgFiltersElement = document.querySelector('.img-filters');
  var picContainerElement = document.querySelector('.pictures');
  var picturesInfo = [];

  var createPicture = function (imageInfo) {

    var samplePicture = document.querySelector('#picture');
    var elem = samplePicture.content.cloneNode(true);

    elem.querySelector('.picture__img').src = imageInfo.url;
    elem.querySelector('.picture__comments').textContent = imageInfo.comments.length;
    elem.querySelector('.picture__likes').textContent = imageInfo.likes;

    return elem;
  };

  var addFragments = function (insideData) {

    var fragment = document.createDocumentFragment();
    var picturesBlock = document.querySelector('.pictures');

    for (var i = 0; i < insideData.length; i++) {
      fragment.appendChild(createPicture(insideData[i]));
    }

    picturesBlock.appendChild(fragment);
  };

  // сортировка изображений

  var removePictures = function () {
    var picturesToRemove = picContainerElement.querySelectorAll('.picture');
    picturesToRemove.forEach(function (item) {
      picContainerElement.removeChild(item);
    });
  };

  var activateFilter = debounce(function (e) {
    removePictures();
    addFragments(changeFilter(e, picturesInfo));
  });

  // загрузка с сервера изображений

  var successHandler = function (data) {
    picturesInfo = data;
    addFragments(picturesInfo);
    imgFiltersElement.classList.remove('img-filters--inactive');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  backend.load(successHandler, errorHandler);

  // фильтры отображения загруженных изображений

  imgFiltersElement.addEventListener('click', function (e) {
    if (e.target.classList.contains('img-filters__button')) {
      activateFilter(e);
    }
  });

  // открытие большой версии изображения

  var getPicture = function (node) {
    return picturesInfo.find(function (picture) {
      return picture.url === node.attributes.src.nodeValue;
    });
  };

  picContainerElement.addEventListener('click', function (e) {

    if (e.target.classList.contains('picture__img')) {
      var picture = getPicture(e.target);
      showBigPicture(picture);
    }
  });

  picContainerElement.addEventListener('keydown', function (e) {

    if (e.keyCode === ENTER_KEYCODE) {
      if (e.target.classList.contains('picture')) {
        var picture = getPicture(e.target.firstElementChild);
        showBigPicture(picture);
      }
    }
  });

})();
