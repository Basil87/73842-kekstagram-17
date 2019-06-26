'use strict';

(function () {

  var URL_GET = 'https://js.dump.academy/kekstagram/data';

  var backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.open('GET', URL_GET);
      xhr.send();
    }

  };

  window.backend = backend;
})();
