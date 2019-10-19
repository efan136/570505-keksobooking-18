// взаимодействие/валидация с формами

'use strict';

(function () {
  var addFormCheckin = document.querySelector('#timein');
  var addFormCheckout = document.querySelector('#timeout');
  var room = document.querySelector('#room_number');
  var guest = document.querySelector('#capacity');
  var addFormType = document.querySelector('#type');
  var addFormPrice = document.querySelector('#price');

  var addFormTitle = document.querySelector('#title');
  addFormTitle.addEventListener('invalid', function () { // валидация тайтла добавления обьявления
    if (addFormTitle.validity.tooShort) {
      addFormTitle.setCustomValidity('Описание не должно быть короче 30 символов');
    } else if (addFormTitle.validity.tooLong) {
      addFormTitle.setCustomValidity('Описание не должно быть длиннее 100 символов');
    } else if (addFormTitle.validity.valueMissing) {
      addFormTitle.setCustomValidity('Заполните это поле');
    } else {
      addFormTitle.setCustomValidity('');
    }
  });

  addFormType.addEventListener('change', function () { // синхронизация тип обьекта и цена
    if (addFormType.value === 'bungalo') {
      addFormPrice.min = 0;
      addFormPrice.placeholder = 0;
    } else if (addFormType.value === 'flat') {
      addFormPrice.min = 1000;
      addFormPrice.placeholder = 1000;
    } else if (addFormType.value === 'house') {
      addFormPrice.min = 5000;
      addFormPrice.placeholder = 5000;
    } else if (addFormType.value === 'palace') {
      addFormPrice.min = 10000;
      addFormPrice.placeholder = 10000;
    }
  });

  addFormPrice.addEventListener('invalid', function () {
    if (addFormPrice.min < 0) {
      addFormPrice.setCustomValidity('бунгало');

    } else if (addFormPrice.min === '1000') {
      addFormPrice.setCustomValidity('квартира от 1000');
    } else if (addFormPrice.min === '5000') {
      addFormPrice.setCustomValidity('дом от 5000');
    } else if (addFormPrice.min === '10000') {
      addFormPrice.setCustomValidity('дворец от 10000');
    } else {
      addFormPrice.setCustomValidity('');
    }
  });

  addFormCheckout.addEventListener('change', function () { // синхронизация чекин-чекоут
    addFormCheckin.value = addFormCheckout.value;
  });

  addFormCheckin.addEventListener('change', function () { // синхронизация чекоут-чекин
    addFormCheckout.value = addFormCheckin.value;
  });

  guest.addEventListener('change', function () { // отлов изменения поля количества мест/гостей

    if (Number(guest.value) === 1 && Number(room.value) > 3) {
      guest.setCustomValidity('вы не можете забронировать себе 100 комнат');
    } else if (Number(guest.value) === 2 && Number(room.value) < 2) {
      guest.setCustomValidity('для двух гостей выберете две или три комнаты');
    } else if (Number(guest.value) === 2 && Number(room.value) > 3) {
      guest.setCustomValidity('вы не можете забронировать себе 100 комнат');
    } else if (Number(guest.value) === 3 && Number(room.value) < 3) {
      guest.setCustomValidity('для трех гостей выберите три комнаты');
    } else if (Number(guest.value) === 3 && Number(room.value) > 3) {
      guest.setCustomValidity('вы не можете забронировать себе 100 комнат');
    } else if (Number(guest.value) === 0 && Number(room.value) < 100) {
      guest.setCustomValidity('этот пункт для 100 комнат');
    } else {
      guest.setCustomValidity('');
    }
  });

  room.addEventListener('change', function () { // отлов изменения поля количества комнат

    if (Number(room.value) === 1 && Number(guest.value) > 1) {
      room.setCustomValidity('в одну комнату нельзя поселить больше 1 человека');
    } else if (Number(room.value) === 2 && Number(guest.value) > 2) {
      room.setCustomValidity('в две комнаты нельзя поселить больше 2 человек');
    } else if (Number(room.value) === 3 && Number(guest.value) > 3) {
      room.setCustomValidity('в три комнаты нельзя поселить больше 3 человек');
    } else if (Number(room.value) === 100 && Number(guest.value) > 0) {
      room.setCustomValidity('в 100 комнат нельзя никого поселить');
    } else if (Number(guest.value) === 0 && Number(room.value) < 100) {
      room.setCustomValidity('выберете больше 3 комнат');
    } else {
      room.setCustomValidity('');
    }
  });
})();
