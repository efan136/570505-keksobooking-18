'use strict';

var accomodation = ['palace', 'flat', 'house', 'bungalo'];

var checkinTimes = ['12:00', '13:00', '14:00'];

var checkoutTimes = ['12:00', '13:00', '14:00'];

var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel4.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel5.jpg'
];

var accomodationPrice = 400;
var accomodationDescription = 'описание';
var offerTitle = 'заголовок 0';
var adressLocation = {'x': 600, 'y': 350};

var getRandomNumber = function (minNumber, maxNumber) {
  return Math.floor(minNumber + Math.random() * (maxNumber - minNumber));
};

var getRandomArrayElement = function (arr, minIndex, maxIndex) {
  return arr[Math.floor(minIndex + Math.random() * (maxIndex - minIndex))];
};

var sliceArrayRandom = function (arr) {
  return arr.slice(1, getRandomNumber(2, arr.length));
};

var getAccomodationData = function () {
  var accomodationData = [];
  for (var i = 1; i <= 8; i++) {
    var incomeObject = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },

      'offer': {
        'title': offerTitle + i,
        'adress': adressLocation,
        'price': accomodationPrice,
        'type': getRandomArrayElement(accomodation, 0, 4),
        'rooms': getRandomNumber(1, 4),
        'guests': getRandomNumber(1, 6),
        'checkin': getRandomArrayElement(checkinTimes, 0, 3),
        'checkout': getRandomArrayElement(checkoutTimes, 0, 3),
        'features': sliceArrayRandom(featuresArray),
        'description': accomodationDescription,
        'photos': sliceArrayRandom(photosArray),
      },

      'location': {
        'x': getRandomNumber(150, 800),
        'y': getRandomNumber(130, 630),
      }
    };
    accomodationData.push(incomeObject);
  }
  return accomodationData;
};

var allAccomodations = getAccomodationData();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
for (var i = 0; i <= allAccomodations.length - 1; i++) {
  var mapPin = document.createElement('button');
  mapPin.type = 'button';
  mapPin.className = 'map__pin';
  mapPin.style.left = allAccomodations[i].location.x + 'px';
  mapPin.style.top = allAccomodations[i].location.y + 'px';
  var mapPinImg = document.createElement('img');
  mapPinImg.src = allAccomodations[i].author.avatar;
  mapPinImg.alt = allAccomodations[i].offer.title;
  mapPinImg.width = '40';
  mapPinImg.height = '40';

  mapPin.appendChild(mapPinImg);

  fragment.appendChild(mapPin);
}
mapPins.appendChild(fragment);
