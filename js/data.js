// создание данных
'use strict';

(function () {
  var map = document.querySelector('.map');
  window.map = map;
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
          type: window.util.getRandomElementFromArray(ACCOMMODATION),
          rooms: window.util.getRandomNumber(1, 4),
          guests: window.util.getRandomNumber(1, 6),
          checkin: window.util.getRandomElementFromArray(CHECKIN_TIMES),
          checkout: window.util.getRandomElementFromArray(CHECKOUT_TIMES),
          features: window.util.sliceArrayRandom(FEATURES),
          description: ACCOMMODATION_DESCRIPTION,
          photos: window.util.sliceArrayRandom(ACCOMMODATION_PHOTOS),
        },

        location: {
          x: window.util.getRandomNumber(0, window.util.getWidthElement(map)),
          y: window.util.getRandomNumber(130, 630),
        }
      };
      accommodationData.push(accommodationOptions);
    }
    return accommodationData;
  };
})();
