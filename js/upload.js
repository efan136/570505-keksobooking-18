// загрузка данных на сервер

'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  window.upload = function (data, onSuccessSend, onErrorSend) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccessSend(xhr.response);
      } else {
        onErrorSend();
      }
    });

    xhr.addEventListener('error', function () {
      onErrorSend();
    });

    xhr.addEventListener('timeout', function () {
      onErrorSend();
    });

    xhr.timeout = 10000; // 10сек
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
