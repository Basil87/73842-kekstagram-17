'use strict';

(function () {

  var commentsLoader = document.querySelector('.comments-loader');

  var makeElement = function (tagName, className) {

    var element = document.createElement(tagName);

    element.classList = className;

    return element;
  };

  var createCommentsBlock = function (commentsArr) {

    var socComments = document.querySelector('.social__comments');
    socComments.innerHTML = '';
    for (var i = 0; i < commentsArr.length; i++) {
      var commentItem = makeElement('li', 'social__comment social__comment--text');
      var commentImg = makeElement('img', 'social__picture');
      commentImg.src = commentsArr[i].avatar;
      commentImg.alt = 'Аватар комментатора фотографии';
      commentImg.width = 35;
      commentItem.appendChild(commentImg);
      commentItem.appendChild(document.createTextNode(commentsArr[i].message));
      socComments.appendChild(commentItem);
      if (i > 4) {
        commentItem.style.display = 'none';
      }
    }
  };

  var addCommentsInfo = function () {
    var commentItems = document.querySelectorAll('.social__comment');
    var commentCount = document.querySelector('.social__comment-count');
    var commentsCount = document.querySelector('.comments-count');
    var count = 0;

    for (var i = 0; i < commentItems.length; i++) {
      if (commentItems[i].style.display !== 'none') {
        count++;
      }
    }
    commentCount.childNodes[0].data = count + ' из ';

    if (count === +commentsCount.textContent) {
      commentsLoader.classList.add('visually-hidden');
      commentCount.classList.add('visually-hidden');
    }
  };

  commentsLoader.addEventListener('click', function () {
    var commentItems = document.querySelectorAll('.social__comment');
    var j = 0;
    for (var i = 0; i < commentItems.length; i++) {
      if (commentItems[i].style.display === 'none') {
        commentItems[i].style.display = '';
        j++;
        if (j > 4) {
          break;
        }
      }
    }
    addCommentsInfo();
  });

  window.createCommentsBlock = createCommentsBlock;

})();
