'use strict';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

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

var allAccommodations = getAccomodationData();

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

removeClass(map, 'map--faded');

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
drawPins(allAccommodations);
