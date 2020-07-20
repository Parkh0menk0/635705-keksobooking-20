'use strict';

(function () {
  var MAX_COUNT = 5;
  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');
  var offers = [];

  /**
   * Callback-функция, нажатия клавиши ESC.
   * @callback onCardEscKeyDown
   * @param {Object} evt событие, которое происходит в DOM.
   */
  var onCardEscKeyDown = function (evt) {
    if (evt.key === window.util.ESC) {
      evt.preventDefault();
      removeCard();
      window.card.removeActiveClass();
      document.removeEventListener('keydown', onCardEscKeyDown);
    }
  };

  /**
   * @description Обработчик создания DOM-элементов отметок на карте.
   * @param {Object[]} ads Массив объявлений.
   */
  var successHandler = function (ads) {
    offers = ads.slice();

    window.pin.render(offers.slice(0, MAX_COUNT));
  };

  /**
   * @description Обработчик ошибки.
   * @param {String} errorMessage Текстовое описание ошибки.
   */
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ff5635;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  /**
   * @description Переводит страницу в активное состояние.
   */
  var setActiveState = function () {
    map.classList.remove('map--faded');

    window.backend.load(successHandler, errorHandler);
    window.form.form.classList.remove('ad-form--disabled');

    window.form.setFieldsetState();
  };


  /**
   * @description Переводит страницу в неактивное состояние.
   */
  var removeActiveState = function () {
    window.pin.remove();

    map.classList.add('map--faded');
    window.form.form.classList.add('ad-form--disabled');
    window.form.setFieldsetState();
    window.drag.mainPin.addEventListener('mousedown', onButtonMousedown, false);
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
    if (evt.key === window.util.ENTER) {
      setActiveState();
      window.drag.mainPin.removeEventListener('keydown', onButtonKeydown, false);
    }
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
      window.drag.mainPin.removeEventListener('mousedown', onButtonMousedown, false);
    }
  };

  window.map = {
    offers: function () {
      return offers;
    },
    checkMapState: checkMapState,
    removeCard: removeCard,
    showCard: showCard,
    onButtonKeydown: onButtonKeydown,
    onButtonMousedown: onButtonMousedown,
    removeActiveState: removeActiveState,
    errorHandler: errorHandler
  };

})();
