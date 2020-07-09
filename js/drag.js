'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');

  window.drag = {
    mainPin: mainPin,
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

      if (mainPin.offsetTop - shift.y < 130) {
        mainPin.style.top = 130 + 'px';
      }

      if (mainPin.offsetTop - shift.y > 630) {
        mainPin.style.top = 630 + 'px';
      }

      if (mainPin.offsetLeft - shift.x < 0) {
        mainPin.style.left = 0 + 'px';
      }

      if (mainPin.offsetLeft - shift.x > 1135) {
        mainPin.style.left = 1135 + 'px';
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

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
