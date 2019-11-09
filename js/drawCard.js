'use strict';
(function () {

  var pinCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var filterContainer = document.querySelector('.map__filters-container');

  var closeCard = function () {
    var pinCard = document.querySelector('.popup');
    window.map.removeChild(pinCard);
  };

  window.createCard = function (arr, index) {

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
    var popupPhotoElements = document.querySelectorAll('.popup__photo');
    var popupAvatar = document.querySelector('.popup__avatar');
    var popupFeatureElements = document.querySelectorAll('.popup__feature');

    // заполнение полей отрисованого фрагмента

    popupTitle.textContent = arr[index].offer.title;
    popupAddress.textContent = arr[index].offer.address;
    popupPrice.textContent = arr[index].offer.price + '₽/ночь';
    popupType.textContent = arr[index].offer.type;
    popupCapacity.textContent = arr[index].offer.rooms + ' комнаты для ' + arr[index].offer.guests + 'гостей';
    popupTime.textContent = 'Заезд после' + arr[index].offer.checkin + ', выезд до ' + arr[index].offer.checkout;
    popupDescription.textContent = arr[index].offer.description;
    popupAvatar.src = arr[index].author.avatar;

    window.util.removeElementsForCollection(popupFeatures, popupFeatureElements); // удалил старые features

    for (var i = 0; i <= arr[index].offer.features.length - 1; i++) { // вставляю иконки features
      var popupNewFeature = document.createElement('li');
      popupNewFeature.className = 'popup__feature ' + 'popup__feature--' + arr[index].offer.features[i];
      popupFeatures.appendChild(popupNewFeature);
    }
    window.util.removeElementsForCollection(popupPhotos, popupPhotoElements); // удаляет старые фотки из шаблона

    for (var k = 0; k <= arr[index].offer.photos.length - 1; k++) { // подгружает новые фотки из данных и рисует их
      var popupNewPhoto = document.createElement('img');
      popupNewPhoto.src = arr[index].offer.photos[k];
      popupNewPhoto.className = 'popup__photo';
      popupNewPhoto.width = 45;
      popupNewPhoto.height = 40;
      popupNewPhoto.alt = 'Фотография жилья';
      popupPhotos.appendChild(popupNewPhoto);
    }

    var closePopupBtn = document.querySelector('.popup__close');
    closePopupBtn.addEventListener('click', function () {
      closeCard();
    });

    window.addEventListener('keydown', function (ev) {
      if (ev.keyCode === 27) {
        closeCard();
      }

    });
  };
})();
