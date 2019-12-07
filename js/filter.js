'use strict';
(function () {

  var houseType = document.querySelector('#housing-type'); // поиск поля тип фильтра
  houseType.addEventListener('change', function () { // отлов события
    window.util.removePins();

    window.filtredData = window.SERVER_DATA.filter(function (it) {
      if (houseType.value === 'house') {
        return it.offer.type === 'house';
      } else if (houseType.value === 'flat') {
        return it.offer.type === 'flat';
      } else if (houseType.value === 'palace') {
        return it.offer.type === 'palace';
      } else if (houseType.value === 'bungalo') {
        return it.offer.type === 'bungalo';
      } else {
        return window.SERVER_DATA;
      }
    });
    window.drawPins(window.filtredData);
  });

})();
