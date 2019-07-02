'use strict';

(function () {

  var debounce = window.debounce;
  var backend = window.backend;
  var changeFilter = window.changeFilter;
  var imgFilters = document.querySelector('.img-filters');
  var picContainer = document.querySelector('.pictures');
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

  var removePictures = function () {
    var picturesToRemove = picContainer.querySelectorAll('.picture');
    for (var i = 0; i < picturesToRemove.length; i++) {
      picContainer.removeChild(picturesToRemove[i]);
    }
  };

  var activateFilter = debounce(function (e) {
    removePictures();
    addFragments(changeFilter(e, picturesInfo));
  });

  var successHandler = function (data) {
    picturesInfo = data;
    addFragments(picturesInfo);
    imgFilters.classList.remove('img-filters--inactive');
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

  imgFilters.addEventListener('click', function (e) {
    if (e.target.classList.contains('img-filters__button')) {
      activateFilter(e);
    }
  });

})();
