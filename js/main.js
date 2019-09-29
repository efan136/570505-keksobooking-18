'use strict'
var getRandomNumber = function (minNumber, maxNumber) {
  return Math.floor(minNumber + Math.random() * (maxNumber - minNumber));
};
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

var createIncomeArray = function () {
  var incomeArray = [];
  for(var i = 1; i <=8; i++){
    var location = {'x' : 600, 'y' : 300};
    var incomeObject = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
       },

      'offer': {
        'title': 'заголовок 0' + i,
        'address': 'location.x, location.y}}',
        'price': 400,
        'type': accomodation[getRandomNumber(1, 5)],
        'rooms': getRandomNumber(0, 4),
        'guests': getRandomNumber(0, 6),
        'checkin': checkinTimes[getRandomNumber(0, 3)],
        'checkout': checkoutTimes[getRandomNumber(0, 3)],
        'features': featuresArray.slice(1, getRandomNumber(1, 5)),
        'description': 'описание',
        'photos': photosArray.slice(0, getRandomNumber(1, 5))
      },

      'location': {
        'x': getRandomNumber(0, 200),
        'y': getRandomNumber(130, 630),
      }
    }
    incomeArray.push(incomeObject);
  }

  return incomeArray
}

createIncomeArray();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
for (var i = 0; i <= createIncomeArray().length - 1; i++) {
  var mapPin = document.createElement('button');
  mapPin.setAttribute('type', 'button');
  mapPin.className = 'map__pin';
  mapPin.style.left = createIncomeArray()[i].location.x;
  mapPin.style.top = createIncomeArray()[i].location.y;
  var mapPinImg = document.createElement('img');
  mapPinImg.alt = createIncomeArray()[i].offer.title;
  mapPinImg.src = createIncomeArray()[i].offer.photos;
  mapPin.appendChild(mapPinImg);

  fragment.appendChild(mapPin);
}
mapPins.appendChild(fragment);
