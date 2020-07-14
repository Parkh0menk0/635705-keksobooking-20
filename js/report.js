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

  var onSuccessAnotherClick = function () {
    successClose();
  };

  var onErrorAnotherClick = function (evt) {
    var errorButton = document.querySelector('main').querySelector('.error__button');
    if (evt.target !== errorButton) {
      errorClose();
    }
  };

  /**
   * @description Закрывает сообщение успешной загрузки формы.
   */
  var successClose = function () {
    document.removeEventListener('click', onSuccessAnotherClick);
    document.removeEventListener('keydown', onSuccessEscPress);
    document.querySelector('main').removeChild(document.querySelector('main .success'));
  };

  /**
   * @description Закрывает сообщение ошибки загрузки формы.
   */
  var errorClose = function () {
    document.removeEventListener('click', onErrorAnotherClick);
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

    document.addEventListener('click', onSuccessAnotherClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  /**
   * @description Обработчик ошибки отправки формы.
   * @param {String} errorMessage сообщение об ошибке;
   */
  var openError = function () {
    var message = templateError.cloneNode(true);
    document.querySelector('main').appendChild(message);
    var button = message.querySelector('.error__button');

    button.addEventListener('click', function () {
      errorClose();
    });

    document.addEventListener('click', onErrorAnotherClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  window.report = {
    openSuccess: openSuccess,
    openError: openError
  };
})();
