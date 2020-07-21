'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  /**
   * @description Устраняет «дребезг» при переключении фильтра.
   * @param {requestCallback} cb Функция обратного вызова.
   * @return {requestCallback} Функция обратного вызова.
   */
  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

})();
