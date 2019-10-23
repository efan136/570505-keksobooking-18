'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  window.util = {
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action;
      }
    },

    getRandomNumber: function (minNumber, maxNumber) {
      return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    },

    getRandomElementFromArray: function (arr) {
      return arr[Math.floor(arr.length * Math.random())];
    },

    sliceArrayRandom: function (arr) {
      return arr.slice(1, window.util.getRandomNumber(2, arr.length));
    },

    getWidthElement: function (element) {
      return element.getBoundingClientRect().width;
    },

    removeClass: function (element, classElement) {
      element.classList.remove(classElement);
    }
  };
})();
