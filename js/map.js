// создаем пины рисуем обьявляем

'use strict';

(function () {
  window.map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  window.mapPins = document.querySelector('.map__pins');
  var mapCheckboxes = document.querySelectorAll('.map__checkbox'); // чекбоксы карты
  var mapFilters = document.querySelectorAll('.map__filter'); // селекты карты
  var addFormFields = document.querySelectorAll('.ad-form fieldset'); // инпуты в подаче обьявления
  var noticeAddressField = document.querySelector('#address'); // адрес координаты
  var addForm = document.querySelector('.ad-form'); // форма добавления обьявления
  var mapPin = document.querySelector('.map__pin');

  var MAP_PIN_MAIN_ARROW_HEIGHT = 22;
  var SERVER_URL = 'https://js.dump.academy/keksobooking/data';
  window.SERVER_DATA = []; // массив полученый с сервера

  var disabledMap = function () { // фунция деактивирует инпуты (по умолчанию)
    window.util.setAttributeForCollection(mapCheckboxes, 'disabled', ''); // деактивируем чекбоксы на карте
    window.util.setAttributeForCollection(mapFilters, 'disabled', ''); // деактивируем селекты на карте
    window.util.setAttributeForCollection(addFormFields, 'disabled', ''); // деактивируем размещение обьявления
  };

  disabledMap();

  var onError = function () { // обработка ошибок сервера
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorPopup = errorTemplate.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(errorPopup);
  };

  var onSuccess = function (data) { // ответ от сервера в случае успеха
    window.SERVER_DATA = data;
    activateMap();
    fillAddressField(mapPinMain, MAP_PIN_MAIN_ARROW_HEIGHT);
  };

  var activateMap = function () { // функция активирует карту, поля, рисует пины
    window.util.removeClass(window.map, 'map--faded');
    window.util.removeClass(addForm, 'ad-form--disabled');
    window.util.removeAttributeForCollection(mapCheckboxes, 'disabled', ''); // активируем чекбоксы на карте
    window.util.removeAttributeForCollection(mapFilters, 'disabled', ''); // активируем селекты на карте
    window.util.removeAttributeForCollection(addFormFields, 'disabled', ''); // активируем размещение обьявления
    window.drawPins(window.SERVER_DATA);
  };

  var fillAddressField = function (element, elementArrowHeight) { // добавляет координаты острого конца метки в поле адреса
    var positionX = parseInt(element.style.left, 10) + Math.round(parseInt(element.offsetWidth, 10) / 2);
    var positionY = parseInt(element.style.top, 10) + (parseInt(element.offsetHeight, 10) + elementArrowHeight);
    noticeAddressField.value = positionX + ',' + positionY;
  };

  fillAddressField(mapPinMain, 0); // заполняет адрес в деативированом режиме(без острого конца)

  mapPinMain.addEventListener('mousedown', function () { // клац мышью и карта активирована

    window.load(SERVER_URL, onSuccess, onError); // получение данных с сервера и отрисовка элементов
  });

  mapPinMain.addEventListener('keydown', function (ev) { // клац по ентеру и карта активирована
    window.util.isEnterEvent(ev, window.load(SERVER_URL, onSuccess, onError));
  });

  mapPin.addEventListener('click', function () {

    setTimeout(window.createCard, 1000); // ВРЕМЕННОЕ РЕШЕНИЕ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  });
})();
