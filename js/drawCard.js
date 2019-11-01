'use strict';

var pinCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filterContainer = document.querySelector('.map__filters-container');


window.createCard = function () {

  // вставил фрагмент в разметку (они появляются после получения данных с сервера)

  var fragment = document.createDocumentFragment();
  fragment.appendChild(pinCardTemplate);
  window.map.insertBefore(fragment, filterContainer);

  // после того как фрагмент создан я нахожу его поля

  var popupTitle = document.querySelector('.popup__title');
  var popupAddress = document.querySelector('.popup__text--address');
  var popupPrice = document.querySelector('.popup__text--price');
  var popupType = document.querySelector('.popup__type');
  var popupCapacity = document.querySelector('.popup__text--capacity');
  var popupTime = document.querySelector('.popup__text--time');
  var popupFeatures = document.querySelector('.popup__features');
  var popupDescription = document.querySelector('.popup__description');
  var popupPhotos = document.querySelector('.popup__photos');
  var popupPhoto = document.querySelector('.popup__photo');
  var popupAvatar = document.querySelector('.popup__avatar');
  var popupFeatureElements = document.querySelectorAll('.popup__feature');

  // заполнение полей отрисованого фрагмента

  popupTitle.textContent = window.SERVER_DATA[0].offer.title;
  popupAddress.textContent = window.SERVER_DATA[0].offer.address;
  popupPrice.textContent = window.SERVER_DATA[0].offer.price + '₽/ночь';
  popupType.textContent = window.SERVER_DATA[0].offer.type;
  popupCapacity.textContent = window.SERVER_DATA[0].offer.rooms + ' комнаты для ' + window.SERVER_DATA[0].offer.guests + 'гостей';
  popupTime.textContent = 'Заезд после' + window.SERVER_DATA[0].offer.checkin + ', выезд до ' + window.SERVER_DATA[0].offer.checkout;
  popupDescription.textContent = window.SERVER_DATA[0].offer.description;
  popupAvatar.src = window.SERVER_DATA[0].author.avatar;

  window.util.removeElementsForCollection(window.SERVER_DATA[0].offer.features, popupFeatures, popupFeatureElements); // удалил старые features

  for (var i = 0; i <= window.SERVER_DATA[0].offer.features.length - 1; i++) { // вставляю иконки features
    var popupNewFeature = document.createElement('li');
    popupNewFeature.className = 'popup__feature ' + 'popup__feature--' + window.SERVER_DATA[0].offer.features[i];
    popupFeatures.appendChild(popupNewFeature);
  }

  popupPhotos.removeChild(popupPhoto); // удаляет старые фотки из шаблона

  for (var k = 0; k <= window.SERVER_DATA[0].offer.photos.length - 1; k++) { // подгружает новые фотки из данных и рисует их
    var popupNewPhoto = document.createElement('img');
    popupPhoto.src = window.SERVER_DATA[0].offer.photos[k];
    popupPhoto.className = 'popup__photo';
    popupPhoto.width = 45;
    popupPhoto.height = 40;
    popupPhoto.alt = 'Фотография жилья';
    popupPhotos.appendChild(popupNewPhoto);
  }
};
