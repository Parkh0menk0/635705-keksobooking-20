'use strict';

(function () {

  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('.ad-form__element');
  var selectCapacity = form.querySelector('#capacity');
  var selectRoomNumber = form.querySelector('#room_number');
  var selectType = form.querySelector('#type');
  var selectPrice = form.querySelector('#price');
  var address = form.querySelector('input[name=address]');
  var selectTimein = form.querySelector('#timein');
  var selectTimeout = form.querySelector('#timeout');
  var submit = form.querySelector('.ad-form__submit');
  var reset = form.querySelector('.ad-form__reset');

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

  /**
   * Callback-функция, устанавливает соответствия количества гостей (спальных мест) с количеством комнат.
   * @callback onSelectRoomNumberChange
   */
  var onSelectRoomNumberChange = function () {
    if (selectCapacity.options.length) {
      Array.from(selectCapacity.options).forEach(function (item) {
        var value = ROOMS_CAPACITY[selectRoomNumber.value];
        var isHidden = !(value.indexOf(item.value) >= 0);

        item.hidden = isHidden;
        item.disabled = isHidden;
        item.selected = value[0] === item.value;
      });
    }
  };

  /**
   * Callback-функция, устанавливает соответствия цены и жилья.
   * @callback onSelectRoomPriceChange
   */
  var onSelectRoomPriceChange = function () {
    if (selectType.options.length) {
      selectPrice.min = types[selectType.value].min;
      selectPrice.placeholder = types[selectType.value].min;
    }
  };

  /**
   * @description Устанавливает значения поля ввода адреса.
   * @param {Object} pin Объект метки.
   * @param {boolean} state Флаг, указывающий6 активна ли страница.
   */
  var setAddress = function (pin) {
    address.style.cursor = 'not-allowed';
    address.value = window.map.checkMapState() ? (Math.round(parseInt(pin.style.left, 10) + pin.clientWidth / 2)) + ', ' + (Math.round(parseInt(pin.style.top, 10) + pin.clientHeight / 2)) : address.value = (Math.round(parseInt(pin.style.left, 10) + pin.clientWidth / 2)) + ', ' + (parseInt(pin.style.top, 10) + pin.clientHeight + window.drag.Offset.ARROW);
  };

  /**
   * @description Задаёт состояние полям формы.
   */
  var setFieldsetState = function () {
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = !fieldset.disabled;
    });
  };

  /**
   * @description Обработчик нажатия по клавише esc.
   * @param {Object} evt Событие DOM.
   */
  var onPopupEscPress = function (evt) {
    if (evt.key === window.util.ESC) {
      closePopup();
    }
  };

  /**
   * Функция закрытия окна оповещения.
   * @function
   */
  var closePopup = function () {
    onFormReset();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  /**
   * @description Обработчик успешной загрузки формы.
   */
  var onSuccess = function () {
    closePopup();
    window.map.removeActiveState();
    window.report.openSuccess();
  };

  /**
   * @description Обработчик ошибки загрузки формы.
   */
  var onError = function () {
    window.report.openError();
  };

  /**
   * @description Обработчик сброса формы.
   */
  var onFormReset = function () {
    form.reset();
    setAddress(window.drag.mainPin);
    onSelectRoomNumberChange();
    window.drag.startPosition();
    window.map.removeActiveState();
  };

  /**
   * @description Обработчик загрузки формы.
   * @param {Object} evt Событие DOM.
   */
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccess, onError);
    onFormReset();
  };

  selectTimein.addEventListener('change', function () {
    selectTimeout.value = selectTimein.value;
  }, false);

  selectTimeout.addEventListener('change', function () {
    selectTimein.value = selectTimeout.value;
  }, false);

  submit.addEventListener('click', function () {
    Array.from(document.querySelectorAll('input:invalid')).forEach(function (item) {
      item.style.boxShadow = (!item.value) ? '0px 0px 4px red' : '0px 0px 0px transparent';
    });
  }, false);

  form.addEventListener('submit', onFormSubmit, false);

  reset.addEventListener('click', function (evt) {
    evt.preventDefault();
    onFormReset();
  }, false);

  window.form = {
    element: form,
    selectType: selectType,
    selectRoomNumber: selectRoomNumber,
    types: types,
    onSelectRoomNumberChange: onSelectRoomNumberChange,
    onSelectRoomPriceChange: onSelectRoomPriceChange,
    setAddress: setAddress,
    setFieldsetState: setFieldsetState
  };

})();
