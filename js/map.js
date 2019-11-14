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
  var ENTER_KEYCODE = 13;

  var MAP_PIN_MAIN_ARROW_HEIGHT = 22;
  var SERVER_URL = 'https://js.dump.academy/keksobooking/data';
  window.SERVER_DATA = []; // массив полученый с сервера

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapBorderRight = window.mapPins.offsetWidth - mapPinMain.offsetWidth;
  var mapBorderLeft = 0;
  var mapBorderTop = 0;
  var mapBorderBottom = window.mapPins.offsetHeight - mapFiltersContainer.offsetHeight - MAP_PIN_MAIN_ARROW_HEIGHT;

  var setLimitX = function () { // задает лимит перемещения по карте главно метки по оси ИКС
    if (mapPinMain.offsetLeft >= mapBorderRight) {
      mapPinMain.style.left = mapBorderRight + 'px';
    } else if (mapPinMain.offsetLeft <= mapBorderLeft) {
      mapPinMain.style.left = mapBorderLeft + 'px';
    }
  };

  var setLimitY = function () { // задает лимит перемещения по карте главно метки по оси ИГРИК
    if (mapPinMain.offsetTop <= mapBorderTop) {
      mapPinMain.style.top = mapBorderTop + 'px';
    } else if (mapPinMain.offsetTop >= mapBorderBottom) {
      mapPinMain.style.top = mapBorderBottom + 'px';
    }
  };

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
    window.filtredData = window.SERVER_DATA;
  };

  var fillAddressField = function (element, elementArrowHeight) { // добавляет координаты острого конца метки в поле адреса
    var positionX = parseInt(element.style.left, 10) + Math.round(parseInt(element.offsetWidth, 10) / 2);
    var positionY = parseInt(element.style.top, 10) + (parseInt(element.offsetHeight, 10) + elementArrowHeight);
    noticeAddressField.value = positionX + ',' + positionY;
  };

  fillAddressField(mapPinMain, 0); // заполняет адрес в деативированом режиме(без острого конца)

  var onMapPinMainEnterPress = function (ev) { //
    if (ev.keyCode === ENTER_KEYCODE) {
      drawLoadData();
      mapPinMain.removeEventListener('keydown', onMapPinMainEnterPress);
    }
  };

  var drawLoadData = function () { //
    window.load(SERVER_URL, onSuccess, onError);
    mapPinMain.removeEventListener('mousedown', drawLoadData);
  };

  mapPinMain.addEventListener('mousedown', drawLoadData); // клик мышью по главному пину отрисовка пинов на карте

  mapPinMain.addEventListener('keydown', onMapPinMainEnterPress); // нажатие кнопкой на главный пин и отрисовка пинов на карте

  var createPinCard = function (ev) { // отлов события для отрисовки карты по нажатию на пин
    var target = ev.target;
    var mapPinImages = document.querySelectorAll('.map__pin img');
    var mapPinButtons = document.querySelectorAll('.map__pin');
    for (var i = 1; i <= mapPinButtons.length; i++) {
      if (target === mapPinImages[i] || target === mapPinButtons[i]) {
        var index = i - 1;
        window.createCard(window.filtredData, index);
      }
    }
  };

  window.mapPins.addEventListener('click', createPinCard);

  window.mapPins.addEventListener('keydown', function (ev) {
    if (ev.keyCode === ENTER_KEYCODE) {
      createPinCard();
    }
  });

  // передвижение главной метки по карте

  mapPinMain.addEventListener('mousedown', function (ev) { // подписался на маусдаун
    var startCoords = {
      x: ev.clientX,
      y: ev.clientY
    };

    var onMouseMove = function (moveEvt) {
      fillAddressField(mapPinMain, MAP_PIN_MAIN_ARROW_HEIGHT);

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = mapPinMain.offsetTop - shift.y + 'px';
      mapPinMain.style.left = mapPinMain.offsetLeft - shift.x + 'px';

      setLimitY();
      setLimitX();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mosueup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove); // создал обработчик при движении мыши
    document.addEventListener('mouseup', onMouseUp); // создал обработчик при отпскании кнопки мыши
  });
})();
