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
  var mainPin = document.querySelector('.map__pin--main');
  var filtersContainer = document.querySelector('.map__filters-container');
  var ads = window.data.createAds(ADS_COUNT, TITLE, TYPE, TIME, FEATURES, PHOTOS);

  /**
   * Callback-функция, нажатия клавиши ESC.
   * @callback onCardEscKeyDown
   * @param {Object} evt событие, которое происходит в DOM.
   */
  function onCardEscKeyDown(evt) {
    if (evt.key === BUTTON.esc) {
      evt.preventDefault();
      window.map.removeCard();
      window.card.removeActiveClass();
      document.removeEventListener('keydown', onCardEscKeyDown);
    }
  }

  /**
   * @description Переводит страницу в активное состояние.
   */
  function setActiveState() {
    window.map.map.classList.remove('map--faded');
    window.map.createMarks();
    window.form.form.classList.remove('ad-form--disabled');

    window.form.setFieldsetState();
  }

  window.map = {

    map: map,
    mainPin: mainPin,

    /**
     * @description Проверяет активна ли страница.
     * @return {boolean} Активна или нет страница.
     */
    checkMapState: function () {
      return map.classList.contains('map--faded');
    },

    /**
     * @description Удаляет карточку.
     */
    removeCard: function () {
      var popup = window.map.map.querySelector('.popup');

      if (popup) {
        popup.remove();
      }
    },

    /**
     * @description Создаёт DOM-элементы отметок на карте на основе JS-объекта.
     * @param {Object[]} generated Сгенерированный массив объявлений.
     */
    createMarks: function () {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < ads.length; i++) {
        fragment.appendChild(window.pin.createMark(ads[i]));
      }

      var list = document.querySelector('.map__pins');

      list.appendChild(fragment);
    },

    /**
     * @description Отрисовывает карточку объявления.
     * @param {Node} pin DOM-узел объявлений.
     */
    showCard: function (pin) {
      var fragment = document.createDocumentFragment();

      fragment.appendChild(window.card.createCard(pin));

      window.map.map.insertBefore(fragment, filtersContainer);

      document.addEventListener('keydown', onCardEscKeyDown);
    },

    /**
     * Callback-функция, для активации страницы клавишей Enter.
     * @callback onButtonMousedown
     * @param {Object} evt событие, которое происходит в DOM.
     */
    onButtonKeydown: function (evt) {
      if (evt.key === BUTTON.enter) {
        setActiveState();
      }
      mainPin.removeEventListener('keydown', window.map.onButtonKeydown, false);
    },

    /**
     * Callback-функция, для активации страницы левой кнопкой мыши.
     * @callback onButtonMousedown
     * @param {Object} evt событие, которое происходит в DOM.
     */
    onButtonMousedown: function (evt) {
      if (evt.button === 0) {
        setActiveState();
        window.form.setAddress(window.map.mainPin);
      }
      window.map.mainPin.removeEventListener('mousedown', window.map.onButtonMousedown, false);
    }

  };

})();
