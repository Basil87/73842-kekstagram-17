'use strict';

(function () {

  var ADD_COMMENTS_COUNT = 4;

  var commentsLoaderElement = document.querySelector('.comments-loader');
  var socCommentCountElement = document.querySelector('.social__comment-count');

  var hideCommentsInfo = function () {
    commentsLoaderElement.classList.add('visually-hidden');
    socCommentCountElement.classList.add('visually-hidden');
  };

  var createElement = function (tagName, className) {

    var element = document.createElement(tagName);
    element.classList = className;
    return element;
  };

  var createCommentsBlock = function (commentsArr) {

    var socCommentBlock = document.querySelector('.social__comments');
    socCommentBlock.innerHTML = '';
    for (var i = 0; i < commentsArr.length; i++) {
      var commentItem = createElement('li', 'social__comment social__comment--text');
      var commentImg = createElement('img', 'social__picture');
      commentImg.src = commentsArr[i].avatar;
      commentImg.alt = commentsArr[i].name;
      commentImg.width = 35;
      commentItem.appendChild(commentImg);
      commentItem.appendChild(document.createTextNode(commentsArr[i].message));
      socCommentBlock.appendChild(commentItem);
      if (i > ADD_COMMENTS_COUNT) {
        commentItem.style.display = 'none';
      }
    }
  };

  var addCommentsInfo = function () {

    var commentItems = document.querySelectorAll('.social__comment');
    var count = 0;

    commentItems.forEach(function (item) {
      if (item.style.display !== 'none') {
        count++;
      }
    });
    socCommentCountElement.childNodes[0].data = count + ' из ';

    if (count === commentItems.length) {
      hideCommentsInfo();
    }
  };

  commentsLoaderElement.addEventListener('click', function () {
    var commentItems = document.querySelectorAll('.social__comment');
    var counter = 0;
    for (var i = 0; i < commentItems.length; i++) {
      if (commentItems[i].style.display === 'none') {
        commentItems[i].style.display = '';
        counter++;
        if (counter > ADD_COMMENTS_COUNT) {
          break;
        }
      }
    }
    addCommentsInfo();
  });

  window.createCommentsBlock = createCommentsBlock;
  window.hideCommentsInfo = hideCommentsInfo;

})();
