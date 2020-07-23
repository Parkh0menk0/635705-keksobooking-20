'use strict';

(function () {

  var Offset = {
    WIDTH: 65,
    HEIGHT: 65,
    ARROW: 20
  };

  var Border = {
    TOP: 130,
    RIGHT: 1200,
    BOTTOM: 630,
    LEFT: 1
  };

  var Start = {
    X: '375px',
    Y: '570px'
  };

  var mainPin = document.querySelector('.map__pin--main');

  /**
   * @description Получает начальные координаты главного пина.
   */
  var getStartPosition = function () {
    mainPin.style.top = Start.X;
    mainPin.style.left = Start.Y;
  };


  var correctCoordinates = function (shift) {
    var x = mainPin.offsetLeft - shift.x;
    var y = mainPin.offsetTop - shift.y;
    var offset = Offset.HEIGHT + Offset.ARROW;

    if (y < Border.TOP - offset) {
      y = Border.TOP - offset;
    } else if (y > Border.BOTTOM - offset) {
      y = Border.BOTTOM - offset;
    }

    if (x < Border.LEFT) {
      x = Border.LEFT;
    } else if (x > Border.RIGHT - Offset.WIDTH) {
      x = Border.RIGHT - Offset.WIDTH;
    }

    mainPin.style.top = y + 'px';
    mainPin.style.left = x + 'px';
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * @description Добавляет слушателя события движения мыши.
     * @param {Object} moveEvt Событие, возникающее при движении мыши с зажатой кнопкой.
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      correctCoordinates(shift);
    };

    /**
     * @description Удаляет слушателя события движения мыши.
     * @param {Object} upEvt Событие, возникающее при отпускании кнопки мыши.
     */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.setAddress(window.drag.mainPin);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
  }, false);

  mainPin.addEventListener('mousedown', window.map.onButtonMousedown, false);
  mainPin.addEventListener('keydown', window.map.onButtonKeydown, false);

  window.drag = {
    Offset: Offset,
    mainPin: mainPin,
    startPosition: getStartPosition
  };

})();
