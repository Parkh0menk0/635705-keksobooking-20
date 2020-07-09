'use strict';

(function () {

  var OFFSET = {
    x: 25,
    y: 70
  };

  /**
   * @description Создаёт DOM-элемент отметки на карте на основе JS-объекта.
   * @param {Object} pin Обьект сгенерированного массива объявлений.
   * @return {Object} DOM-элемент отметки на карте.
   */
  var createMark = function (pin) {
    var template = document.querySelector('#pin').content.querySelector('button');
    var element = template.cloneNode(true);
    var avatar = element.querySelector('.map__pin img');
    element.style.left = pin.location.x - OFFSET.x + 'px';
    element.style.top = pin.location.y - OFFSET.y + 'px';
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

  window.pin = {
    createMark: createMark
  };

})();
