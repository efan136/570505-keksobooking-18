// создаем пины рисуем обьявляем

'use strict';

(function () {
  window.map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var mapCheckboxes = document.querySelectorAll('.map__checkbox'); // чекбоксы карты
  var mapFilters = document.querySelectorAll('.map__filter'); // селекты карты
  var addFormFields = document.querySelectorAll('.ad-form fieldset'); // инпуты в подаче обьявления
  var noticeAddressField = document.querySelector('#address'); // адрес координаты
  var addForm = document.querySelector('.ad-form'); // форма добавления обьявления
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAP_PIN_MAIN_ARROW_HEIGHT = 22;
  var SERVER_URL = 'https://js.dump.academy/keksobooking/data';
  var SERVER_DATA = ''; // массив полученый с сервера

  var createButton = function (type, className, x, y) { // создание кнопки пина
    var button = document.createElement('button');
    button.type = type;
    button.className = className;
    button.style.left = x - (PIN_WIDTH / 2) + 'px';
    button.style.top = y - (PIN_HEIGHT) + 'px';
    return button;
  };

  var createImg = function (src, title, width, height) { // создание картинки пина
    var img = document.createElement('img');
    img.src = src;
    img.alt = title;
    img.width = String(width);
    img.height = String(height);
    return img;
  };

  var drawPins = function (arr) { // отрисовка пина
    var fragment = document.createDocumentFragment();

    for (var i = 0; i <= arr.length - 1; i++) {
      var mapPin = createButton(
          'button',
          'map__pin',
          arr[i].location.x,
          arr[i].location.y
      );

      var mapPinImg = createImg(
          arr[i].author.avatar,
          arr[i].offer.title,
          40,
          40
      );

      mapPin.appendChild(mapPinImg);
      fragment.appendChild(mapPin);
    }

    mapPins.appendChild(fragment);
  };

  var setAttributeForCollection = function (collections, attribute, value) { // задает атрибут для коллекции (деактивация полей)

    for (var i = 0; i <= collections.length - 1; i++) {
      var collectionElement = collections[i];
      collectionElement.setAttribute(attribute, value);
    }
  };

  var removeAttributeForCollection = function (collections, attribute, value) { // убирает атрибут из коллекции (активация полей )

    for (var i = 0; i <= collections.length - 1; i++) {
      var collectionElement = collections[i];
      collectionElement.removeAttribute(attribute, value);
    }
  };

  var disabledMap = function () { // фунция деактивирует инпуты (по умолчанию)
    setAttributeForCollection(mapCheckboxes, 'disabled', ''); // деактивируем чекбоксы на карте
    setAttributeForCollection(mapFilters, 'disabled', ''); // деактивируем селекты на карте
    setAttributeForCollection(addFormFields, 'disabled', ''); // деактивируем размещение обьявления
  };

  disabledMap();

  var mapPinMainClickHandler = function () { // активирует карту и заполняет поле адреса. используется в ф-и LOAD
    activateMap();
    fillAddressField(mapPinMain, MAP_PIN_MAIN_ARROW_HEIGHT);
  };

  var onError = function () { // обработка ошибок сервера
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorPopup = errorTemplate.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(errorPopup);
  };

  var onSuccess = function (data) { // ответ от сервера в случае успеха
    SERVER_DATA = data;
    mapPinMainClickHandler();
  };

  var activateMap = function () { // функция активирует карту, поля, рисует пины

    window.util.removeClass(window.map, 'map--faded');
    window.util.removeClass(addForm, 'ad-form--disabled');
    removeAttributeForCollection(mapCheckboxes, 'disabled', ''); // активируем чекбоксы на карте
    removeAttributeForCollection(mapFilters, 'disabled', ''); // активируем селекты на карте
    removeAttributeForCollection(addFormFields, 'disabled', ''); // активируем размещение обьявления
    drawPins(SERVER_DATA);
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
})();
