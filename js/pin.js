'use strict';

(function () {

  var Offset = {
    X: 25,
    Y: 70
  };

  var list = document.querySelector('.map__pins');

  /**
   * @description Создаёт DOM-элемент отметки на карте на основе JS-объекта.
   * @param {Object} pin Обьект сгенерированного массива объявлений.
   * @return {Object} DOM-элемент отметки на карте.
   */
  var createMark = function (pin) {
    var template = document.querySelector('#pin').content.querySelector('button');
    var element = template.cloneNode(true);
    var avatar = element.querySelector('.map__pin img');
    element.style.left = pin.location.x - Offset.X + 'px';
    element.style.top = pin.location.y - Offset.Y + 'px';
    avatar.src = pin.author.avatar;
    avatar.alt = pin.offer.title;

    element.addEventListener('click', function () {
      window.map.removeCard();

      window.card.removeActiveClass();

      element.classList.add('map__pin--active');

      window.map.showCard(pin);
    });

    return element;
  };

  /**
   * @description Добавляет DOM-элементы отметкок на карте настраницу.
   * @param {Object[]} ads Массив объектов.
   */
  var renderPins = function (ads) {
    var fragment = document.createDocumentFragment();

    ads.forEach(function (pin) {
      fragment.appendChild(createMark(pin));
    });

    list.appendChild(fragment);
  };

  /**
   * @description Удаляет DOM-элементы отметкок на карте настраницу.
   */
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (pins) {
      pins.forEach(function (item) {
        item.remove();
      });
    }
  };

  /**
   * @description Выполняет отрисовку отметок на карте после фильтрации.
   * @param {Object[]} ads Массив объектов.
   */
  var updatePins = function () {
    var filteredAds = window.map.offers;
    removePins.remove();
    renderPins(window.filter(filteredAds));
  };

  window.pin = {
    render: renderPins,
    remove: removePins,
    update: updatePins
  };

})();
