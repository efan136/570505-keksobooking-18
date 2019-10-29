'use strict';
(function () {

  var houseType = document.querySelector('#housing-type'); // поиск поля тип фильтра
  houseType.addEventListener('change', function () { // отлов события

    var removePins = function () {
      var mapPinElements = document.querySelectorAll('.map__pin'); // поиск отрисованых пинов
      for (var i = mapPinElements.length - 1; i >= 1; i--) { // иду по отрисованым пинам и удаляю их
        window.mapPins.removeChild(mapPinElements[i]); // удаляю пины
      }
    };
    removePins();

    var filtredData = window.SERVER_DATA.filter(function (SERVER_DAT) {
      if (houseType.value === 'house') {
        return SERVER_DAT.offer.type === 'house';
      } else if (houseType.value === 'flat') {
        return SERVER_DAT.offer.type === 'flat';
      } else if (houseType.value === 'palace') {
        return SERVER_DAT.offer.type === 'palace';
      } else if (houseType.value === 'bungalo') {
        return SERVER_DAT.offer.type === 'bungalo';
      } else {
        return window.SERVER_DATA;
      }
    });
    window.drawPins(filtredData);
  });

})();
