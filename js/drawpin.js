'use strict';
(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinQuantity = 5;


  var createButton = function (type, className, x, y) { // создание кнопки пина
    var button = document.createElement('button');
    button.type = type;
    button.className = className;
    button.style.left = x - (PIN_WIDTH / 2) + 'px';
    button.style.top = y - (PIN_HEIGHT) + 'px';
    return button;
  };

  var createImg = function (src, title, width, height) { // создание картинки пина
    var img = document.createElement('img');
    img.src = src;
    img.alt = title;
    img.width = String(width);
    img.height = String(height);
    return img;
  };

  window.drawPins = function (arr) { // отрисовка пина
    arr = arr.slice(0, pinQuantity);
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

    window.mapPins.appendChild(fragment);
  };
})();
