'use strict';

(function () {

  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('.ad-form__element');
  var selectCapacity = form.querySelector('#capacity');
  var selectRoomNumber = form.querySelector('#room_number');
  var selectType = form.querySelector('#type');
  var selectPrice = form.querySelector('#price');
  var address = form.querySelector('input[name=address]');
  var selectTimein = form.querySelector('#timein');
  var selectTimeout = form.querySelector('#timeout');

  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var types = {
    palace: {
      ru: 'Дворец',
      min: 10000
    },
    flat: {
      ru: 'Квартира',
      min: 1000
    },
    house: {
      ru: 'Дом',
      min: 5000
    },
    bungalo: {
      ru: 'Бунгало',
      min: 0
    }
  };

  window.form = {

    form: form,
    selectType: selectType,
    selectRoomNumber: selectRoomNumber,
    types: types,

    /**
     * Callback-функция, устанавливает соответствия количества гостей (спальных мест) с количеством комнат.
     * @callback onSelectRoomNumberChange
     */
    onSelectRoomNumberChange: function () {
      if (selectCapacity.options.length) {
        Array.from(selectCapacity.options).forEach(function (item) {
          var value = ROOMS_CAPACITY[selectRoomNumber.value];
          var isHidden = !(value.indexOf(item.value) >= 0);

          item.hidden = isHidden;
          item.disabled = isHidden;
          item.selected = value[0] === item.value;
        });
      }
    },

    /**
     * Callback-функция, устанавливает соответствия цены и жилья.
     * @callback onSelectRoomPriceChange
     */
    onSelectRoomPriceChange: function () {
      if (selectType.options.length) {
        selectPrice.min = types[selectType.value].min;
        selectPrice.placeholder = types[selectType.value].min;
      }
    },

    /**
     * @description Устанавливает значения поля ввода адреса.
     * @param {Object} pin Объект метки.
     * @param {boolean} state Флаг, указывающий6 активна ли страница.
     */
    setAddress: function (pin) {
      address.style.cursor = 'not-allowed';
      address.value = window.map.checkMapState() ? (Math.round(pin.offsetLeft + pin.clientWidth / 2)) + ', ' + (Math.round(pin.offsetTop + pin.clientHeight / 2)) : address.value = (Math.round(pin.offsetLeft + pin.clientWidth / 2)) + ', ' + (pin.offsetTop + pin.clientHeight);
    },

    /**
     * @description Задаёт состояние полям формы.
     */
    setFieldsetState: function () {
      fieldsets.forEach(function (fieldset) {
        fieldset.disabled = !fieldset.disabled;
      });
    }

  };

  selectTimein.addEventListener('change', function () {
    selectTimeout.value = selectTimein.value;
  }, false);

  selectTimeout.addEventListener('change', function () {
    selectTimein.value = selectTimeout.value;
  }, false);

})();