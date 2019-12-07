'use strict';

(function () {

  var onSuccessSend = function () { // в случае успешной отправки делаем это
    window.deActivateMap(); // деактивируем карту
    var successTemplate = document.querySelector('#success').content.querySelector('.success'); // находим шаблон
    var successFormMessage = successTemplate.cloneNode(true); // копируем шаблон
    window.main.appendChild(successFormMessage); // ставим шаблон куда надо

    var removeSuccessFormMessage = function () { // удаляем сообщение об успеной отправке
      window.main.removeChild(successFormMessage);
    };

    document.addEventListener('click', function () { // удаляем сообщение об успешной обработке по клику
      removeSuccessFormMessage();
    });

    document.addEventListener('keydown', function (ev) { // удаляем сообщение об успешной обработке по ескейпу
      if (ev.keyCode === window.ESC_KEYCODE) {
        removeSuccessFormMessage();
      }
    });
  };

  var onErrorSend = function () { // в случае ошибки делаем это
    var errorTemplate = document.querySelector('#error').content.querySelector('.error'); // находим шаблон
    var errorFormMessage = errorTemplate.cloneNode(true); // копируем
    window.main.appendChild(errorFormMessage); // ставим шаблон куда надо

    var removeErrorFormMessage = function () { // удаляем сообщение об ошибке
      window.main.removeChild(errorFormMessage);
    };

    var errorMessageBtn = document.querySelector('.error__button'); // удаляем сообщение об ошибке по эскейпу на кнопку
    errorMessageBtn.addEventListener('keydown', function (ev) {
      if (ev.keyCode === window.ESC_KEYCODE) {
        removeErrorFormMessage();
      }
    });

    errorMessageBtn.addEventListener('click', function () { // удаляем сообщение об ошибке по клику на кнопку
      removeErrorFormMessage();
    });

    document.addEventListener('click', function () { // удаляем сообщение об ошибке по клику в любое место
      removeErrorFormMessage();
    });

    document.addEventListener('keydown', function (ev) { // удаляем сообщение об ошибке по эскейпу
      if (ev.keyCode === window.ESC_KEYCODE) {
        removeErrorFormMessage();
      }
    });
  };

  window.addForm.addEventListener('submit', function (evt) { // собираем все правила воедино при отправке формы
    window.upload(new FormData(window.addForm), onSuccessSend, onErrorSend);
    evt.preventDefault();
  });
})();
