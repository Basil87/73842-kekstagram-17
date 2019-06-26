'use strict';

(function () {

  var backend = window.backend;
  var picturesInfo = [];

  var createPicture = function (imageInfo) {

    var samplePicture = document.querySelector('#picture');
    var elem = samplePicture.content.cloneNode(true);

    elem.querySelector('.picture__img').src = imageInfo.url;
    elem.querySelector('.picture__comments').textContent = imageInfo.comments.length;
    elem.querySelector('.picture__likes').textContent = imageInfo.likes;

    return elem;
  };

  var addFragments = function () {

    var fragment = document.createDocumentFragment();
    var picturesBlock = document.querySelector('.pictures');

    for (var i = 0; i < picturesInfo.length; i++) {
      fragment.appendChild(createPicture(picturesInfo[i]));
    }

    picturesBlock.appendChild(fragment);
  };

  var successHandler = function (data) {
    picturesInfo = data;
    addFragments();
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

})();
