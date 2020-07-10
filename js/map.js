'use strict';

(function () {

  var BUTTON = {
    enter: 'Enter',
    esc: 'Escape'
  };

  var ADS_COUNT = 8;

  var TITLE = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var TYPE = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');
  var ads = window.data.create(ADS_COUNT, TITLE, TYPE, TIME, FEATURES, PHOTOS);

  /**
   * Callback-функция, нажатия клавиши ESC.
   * @callback onCardEscKeyDown
   * @param {Object} evt событие, которое происходит в DOM.
   */
  var onCardEscKeyDown = function (evt) {
    if (evt.key === BUTTON.esc) {
      evt.preventDefault();
      removeCard();
      window.card.removeActiveClass();
      document.removeEventListener('keydown', onCardEscKeyDown);
    }
  };

  /**
   * @description Переводит страницу в активное состояние.
   */
  var setActiveState = function () {
    map.classList.remove('map--faded');
    createMarks();
    window.form.form.classList.remove('ad-form--disabled');

    window.form.setFieldsetState();
  };

  /**
   * @description Проверяет активна ли страница.
   * @return {boolean} Активна или нет страница.
   */
  var checkMapState = function () {
    return map.classList.contains('map--faded');
  };

  /**
   * @description Удаляет карточку.
   */
  var removeCard = function () {
    var popup = document.querySelector('.popup');

    if (popup) {
      popup.remove();
    }
  };

  /**
   * @description Создаёт DOM-элементы отметок на карте на основе JS-объекта.
   * @param {Object[]} generated Сгенерированный массив объявлений.
   */
  var createMarks = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(window.pin.create(ads[i]));
    }

    var list = document.querySelector('.map__pins');

    list.appendChild(fragment);
  };

  /**
   * @description Отрисовывает карточку объявления.
   * @param {Node} pin DOM-узел объявлений.
   */
  var showCard = function (pin) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(window.card.create(pin));

    map.insertBefore(fragment, filtersContainer);

    document.addEventListener('keydown', onCardEscKeyDown);
  };

  /**
   * Callback-функция, для активации страницы клавишей Enter.
   * @callback onButtonMousedown
   * @param {Object} evt событие, которое происходит в DOM.
   */
  var onButtonKeydown = function (evt) {
    if (evt.key === BUTTON.enter) {
      setActiveState();
    }
    window.drag.mainPin.removeEventListener('keydown', onButtonKeydown, false);
  };

  /**
   * Callback-функция, для активации страницы левой кнопкой мыши.
   * @callback onButtonMousedown
   * @param {Object} evt событие, которое происходит в DOM.
   */
  var onButtonMousedown = function (evt) {
    if (evt.button === 0) {
      setActiveState();
      window.form.setAddress(window.drag.mainPin);
    }
    window.drag.mainPin.removeEventListener('mousedown', onButtonMousedown, false);
  };

  window.map = {

    checkMapState: checkMapState,
    removeCard: removeCard,
    createMarks: createMarks,
    showCard: showCard,
    onButtonKeydown: onButtonKeydown,
    onButtonMousedown: onButtonMousedown
  };

})();
