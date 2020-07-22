'use strict';

(function () {

  var Border = {
    TOP: 130,
    RIGHT: 1135,
    BOTTOM: 630,
    LEFT: 0
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

      if (mainPin.offsetTop - shift.y < Border.TOP) {
        mainPin.style.top = Border.TOP + 'px';
      }

      if (mainPin.offsetTop - shift.y > Border.BOTTOM) {
        mainPin.style.top = Border.BOTTOM + 'px';
      }

      if (mainPin.offsetLeft - shift.x < Border.LEFT) {
        mainPin.style.left = Border.LEFT + 'px';
      }

      if (mainPin.offsetLeft - shift.x > Border.RIGHT) {
        mainPin.style.left = Border.RIGHT + 'px';
      }

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
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

  window.drag = {
    mainPin: mainPin,
    startPosition: getStartPosition
  };

})();
