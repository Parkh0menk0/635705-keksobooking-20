'use strict';

(function () {

  var URL = {
    load: 'https://javascript.pages.academy/keksobooking/data',
    send: 'https://javascript.pages.academy/keksobooking'
  };

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };

  var TIMEOUT_IN_MS = 10000;
  /**
   * @description Cоздаёт объект XMLHttpReques.
   * @param {requestCallback} onLoad Функция обратного вызова, которая срабатывает при успешном выполнении запроса.
   * @param {requestCallback} onError Функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
   * @return {Object} объект XMLHttpRequest.
   */
  var createXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case StatusCode.UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case StatusCode.NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  /**
   * @description Получает с сервера данные с помощью объекта XMLHttpRequest, обрабатывает полученные запросы и передаёт полученную информацию в функцию обратного вызова.
   * @param {requestCallback} onLoad Функция обратного вызова, которая срабатывает при успешном выполнении запроса.
   * @param {requestCallback} onError Функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
   */
  var load = function (onLoad, onError) {
    var xhr = createXHR(onLoad, onError);
    xhr.open('GET', URL.load);
    xhr.send();
  };

  /**
   * @description Отправляет данные на сервер, если ошибок не произошло.
   * @param {Object} data Объект FormData, который содержит данные формы, которые будут отправлены на сервер.
   * @param {requestCallback} onLoad Функция обратного вызова, которая срабатывает при успешном выполнении запроса.
   * @param {requestCallback} onError Функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
   */
  var save = function (data, onLoad, onError) {
    var xhr = createXHR(onLoad, onError);
    xhr.open('POST', URL.send);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
