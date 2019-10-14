'use strict';

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var mapCheckboxes = document.querySelectorAll('.map__checkbox'); // чекбоксы карты
var mapFilters = document.querySelectorAll('.map__filter'); // селекты карты
var addFormFields = document.querySelectorAll('.ad-form fieldset'); // инпуты в подаче обьявления
var noticeAddressField = document.querySelector('#address'); // адрес координаты
var addForm = document.querySelector('.ad-form'); // форма добавления обьявления
var addFormCheckin = document.querySelector('#timein');
var addFormCheckout = document.querySelector('#timeout');
var room = document.querySelector('#room_number');
var guest = document.querySelector('#capacity');
var addFormType = document.querySelector('#type');
var addFormPrice = document.querySelector('#price');

var ACCOMMODATION = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ACCOMMODATION_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

var ACCOMMODATION_PRICE = 400;
var ACCOMMODATION_DESCRIPTION = 'описание';
var OFFER_TITLE = 'offer heading 0';
var ADDRESS_LOCATION = {'x': 600, 'y': 350};
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAP_PIN_MAIN_ARROW_HEIGHT = 22;

var getRandomNumber = function (minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};

var getRandomElementFromArray = function (arr) {
  return arr[Math.floor(arr.length * Math.random())];
};

var sliceArrayRandom = function (arr) {
  return arr.slice(1, getRandomNumber(2, arr.length));
};

var getWidthElement = function (element) {
  return element.getBoundingClientRect().width;
};

var removeClass = function (element, classElement) {
  element.classList.remove(classElement);
};

var getAccomodationData = function () {
  var accommodationData = [];
  for (var i = 1; i <= 8; i++) {
    var accommodationOptions = {
      author: {
        'avatar': 'img/avatars/user0' + i + '.png'
      },

      offer: {
        title: OFFER_TITLE + i,
        address: ADDRESS_LOCATION,
        price: ACCOMMODATION_PRICE,
        type: getRandomElementFromArray(ACCOMMODATION),
        rooms: getRandomNumber(1, 4),
        guests: getRandomNumber(1, 6),
        checkin: getRandomElementFromArray(CHECKIN_TIMES),
        checkout: getRandomElementFromArray(CHECKOUT_TIMES),
        features: sliceArrayRandom(FEATURES),
        description: ACCOMMODATION_DESCRIPTION,
        photos: sliceArrayRandom(ACCOMMODATION_PHOTOS),
      },

      location: {
        x: getRandomNumber(0, getWidthElement(map)),
        y: getRandomNumber(130, 630),
      }
    };
    accommodationData.push(accommodationOptions);
  }
  return accommodationData;
};

var createButton = function (type, className, x, y) {
  var button = document.createElement('button');
  button.type = type;
  button.className = className;
  button.style.left = x - (PIN_WIDTH / 2) + 'px';
  button.style.top = y - (PIN_HEIGHT) + 'px';
  return button;
};

var createImg = function (src, title, width, height) {
  var img = document.createElement('img');
  img.src = src;
  img.alt = title;
  img.width = String(width);
  img.height = String(height);
  return img;
};

var drawPins = function (arr) {
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


// следующее задание
var setAttributeForCollection = function (collections, attribute, value) { // задает атрибут для коллекции

  for (var i = 0; i <= collections.length - 1; i++) {
    var collectionElement = collections[i];
    collectionElement.setAttribute(attribute, value);
  }
};

var removeAttributeForCollection = function (collections, attribute, value) { // убирает атрибут из коллекции

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

var activateMap = function () { // функция активирует карту
  removeClass(map, 'map--faded');
  removeClass(addForm, 'ad-form--disabled');
  removeAttributeForCollection(mapCheckboxes, 'disabled', ''); // активируем чекбоксы на карте
  removeAttributeForCollection(mapFilters, 'disabled', ''); // активируем селекты на карте
  removeAttributeForCollection(addFormFields, 'disabled', ''); // активируем размещение обьявления
  var allAccommodations = getAccomodationData();
  drawPins(allAccommodations);
};

var fillAddressField = function (element, elementArrowHeight) { // добавляет координаты острого конца метки в поле адреса
  var positionX = parseInt(element.style.left, 10) + Math.round(parseInt(element.offsetWidth, 10) / 2);
  var positionY = parseInt(element.style.top, 10) + (parseInt(element.offsetHeight, 10) + elementArrowHeight);
  noticeAddressField.value = positionX + ',' + positionY;
};

fillAddressField(mapPinMain, 0); // заполняет адрес в деативированом режиме(без острого конца)

var mapPinMainClickHandler = function () { // активирует карту и заполняет поле адреса
  activateMap();
  fillAddressField(mapPinMain, MAP_PIN_MAIN_ARROW_HEIGHT);
};

mapPinMain.addEventListener('mousedown', function () { // клац мышью и карта активирована
  mapPinMainClickHandler();
});

mapPinMain.addEventListener('keydown', function (ev) { // клац по ентеру и карта активирована
  if (ev.keyCode === 13) {
    mapPinMainClickHandler();
  }
});

// валидация форм

var addFormTitle = document.querySelector('#title');
addFormTitle.addEventListener('invalid', function () { // валидация тайтла добавления обьявления
  if (addFormTitle.validity.tooShort) {
    addFormTitle.setCustomValidity('Описание не должно быть короче 30 символов');
  } else if (addFormTitle.validity.tooLong) {
    addFormTitle.setCustomValidity('Описание не должно быть длиннее 100 символов');
  } else if (addFormTitle.validity.valueMissing) {
    addFormTitle.setCustomValidity('Заполните это поле');
  } else {
    addFormTitle.setCustomValidity('');
  }
});

addFormType.addEventListener('change', function () { // синхронизация тип обьекта и цена
  if (addFormType.value === 'bungalo') {
    addFormPrice.min = 0;
    addFormPrice.placeholder = 0;
  } else if (addFormType.value === 'flat') {
    addFormPrice.min = 1000;
    addFormPrice.placeholder = 1000;
  } else if (addFormType.value === 'house') {
    addFormPrice.min = 5000;
    addFormPrice.placeholder = 5000;
  } else if (addFormType.value === 'palace') {
    addFormPrice.min = 10000;
    addFormPrice.placeholder = 10000;
  }
});

addFormPrice.addEventListener('invalid', function () {
  if (addFormPrice.min < 0) {
    addFormPrice.setCustomValidity('бунгало');

  } else if (addFormPrice.min === '1000') {
    addFormPrice.setCustomValidity('квартира от 1000');
  } else if (addFormPrice.min === '5000') {
    addFormPrice.setCustomValidity('дом от 5000');
  } else if (addFormPrice.min === '10000') {
    addFormPrice.setCustomValidity('дворец от 10000');
  } else {
    addFormPrice.setCustomValidity('');
  }
});

addFormCheckout.addEventListener('change', function () { // синхронизация чекин-чекоут
  addFormCheckin.value = addFormCheckout.value;
});

addFormCheckin.addEventListener('change', function () { // синхронизация чекоут-чекин
  addFormCheckout.value = addFormCheckin.value;
});

guest.addEventListener('change', function () { // отлов изменения поля количества мест/гостей

  if (Number(guest.value) === 1 && Number(room.value) > 3) {
    guest.setCustomValidity('вы не можете забронировать себе 100 комнат');
  } else if (Number(guest.value) === 2 && Number(room.value) < 2) {
    guest.setCustomValidity('для двух гостей выберете две или три комнаты');
  } else if (Number(guest.value) === 2 && Number(room.value) > 3) {
    guest.setCustomValidity('вы не можете забронировать себе 100 комнат');
  } else if (Number(guest.value) === 3 && Number(room.value) < 3) {
    guest.setCustomValidity('для трех гостей выберите три комнаты');
  } else if (Number(guest.value) === 3 && Number(room.value) > 3) {
    guest.setCustomValidity('вы не можете забронировать себе 100 комнат');
  } else if (Number(guest.value) === 0 && Number(room.value) < 100) {
    guest.setCustomValidity('этот пункт для 100 комнат');
  } else {
    guest.setCustomValidity('');
  }
});

room.addEventListener('change', function () { // отлов изменения поля количества комнат

  if (Number(room.value) === 1 && Number(guest.value) > 1) {
    room.setCustomValidity('в одну комнату нельзя поселить больше 1 человека');
  } else if (Number(room.value) === 2 && Number(guest.value) > 2) {
    room.setCustomValidity('в две комнаты нельзя поселить больше 2 человек');
  } else if (Number(room.value) === 3 && Number(guest.value) > 3) {
    room.setCustomValidity('в три комнаты нельзя поселить больше 3 человек');
  } else if (Number(room.value) === 100 && Number(guest.value) > 0) {
    room.setCustomValidity('в 100 комнат нельзя никого поселить');
  } else if (Number(guest.value) === 0 && Number(room.value) < 100) {
    room.setCustomValidity('выберете больше 3 комнат');
  } else {
    room.setCustomValidity('');
  }
});
