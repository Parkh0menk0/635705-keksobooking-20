'use strict';

(function () {
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');

  /**
   * @description Закрывает сообщение по нажатию клавиши esc.
   * @param {requestCallback} action функция закрывающая сообщение успешной загрузки (или ошибки) формы.
   * @param {String} key Строковое представление клавиши esc.
   * @return {requestCallback}
   */
  var onPopupEscPress = function (action, key) {
    return (function (evt) {
      if (evt.key === key) {
        action();
      }
    });
  };

  /**
   * @description Закрывает сообщение по клику на произвольную область экрана.
   * @param {Object} evt Событие DOM.
   */
  var onAnywhereClick = function (evt) {
    switch (evt.target) {
      case (document.querySelector('main').querySelector('.error')):
        errorClose();
        break;
      case (document.querySelector('main').querySelector('.success')):
        successClose();
        break;
      default:
        throw new Error('Неизвестное оповещение: «' + evt.target + '»');
    }
  };

  /**
   * @description Закрывает сообщение успешной загрузки формы.
   */
  var successClose = function () {
    document.removeEventListener('click', onAnywhereClick);
    document.removeEventListener('keydown', onSuccessEscPress);
    document.querySelector('main').removeChild(document.querySelector('main .success'));
  };

  /**
   * @description Закрывает сообщение ошибки загрузки формы.
   */
  var errorClose = function () {
    document.removeEventListener('click', onAnywhereClick);
    document.removeEventListener('keydown', onErrorEscPress);
    document.querySelector('main').removeChild(document.querySelector('main .error'));
  };

  var onSuccessEscPress = onPopupEscPress(successClose, window.util.ESC);
  var onErrorEscPress = onPopupEscPress(errorClose, window.util.ESC);

  /**
   * @description Обработчик успешной загрузки формы.
   */
  var openSuccess = function () {
    var message = templateSuccess.cloneNode(true);
    document.querySelector('main').appendChild(message);
    try {
      document.addEventListener('click', onAnywhereClick, false);
    } catch (e) {
      window.map.onErrorLoad('Error: ' + e.message + ' ' + e.stack);
    }
    document.addEventListener('keydown', onSuccessEscPress, false);
  };

  /**
   * @description Обработчик ошибки отправки формы.
   * @param {String} errorMessage сообщение об ошибке;
   */
  var openError = function () {
    var message = templateError.cloneNode(true);
    document.querySelector('main').appendChild(message);
    try {
      document.addEventListener('click', onAnywhereClick, false);
    } catch (e) {
      window.map.onErrorLoad('Error: ' + e.message + ' ' + e.stack);
    }
    document.addEventListener('keydown', onErrorEscPress, false);
  };

  window.report = {
    openSuccess: openSuccess,
    openError: openError
  };
})();
