'use strict';

(function () {
  var findRandomElem = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);

    return arr[rand];
  };

  var findRandomMinMax = function (min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var Mock = function (index) {
    var COMMENT_ARRAY = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
    var MIN_COMMENTS = 15;
    var MAX_COMMENTS = 200;

    this._createCommentsArr = function () {
      var commentsArr = [];
      for (var i = 0; i < findRandomMinMax(1, 2); i++) {
        commentsArr.push(findRandomElem(COMMENT_ARRAY));
      }

      return commentsArr;
    };

    this.url = 'photos/' + (index + 1) + '.jpg';
    this.likes = findRandomMinMax(MIN_COMMENTS, MAX_COMMENTS);
    this.comments = this._createCommentsArr();
  };

  window.Mock = Mock;
})();
