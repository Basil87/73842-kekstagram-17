'use strict';

(function () {

  var NUMBER_OF_PICTURES = 25;

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

    for (var i = 0; i < NUMBER_OF_PICTURES; i++) {
      fragment.appendChild(createPicture(new window.Mock(i)));
    }

    picturesBlock.appendChild(fragment);
  };

  addFragments();

})();
