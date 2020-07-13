'use strict';

(function () {

  var URL = {
    load: 'https://javascript.pages.academy/keksobooking/data'
  };

  var statusCode = {
    OK: 200,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404
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
        case statusCode.OK:
          onLoad(xhr.response);
          break;
        case statusCode.BadRequest:
          error = 'Неверный запрос';
          break;
        case statusCode.Unauthorized:
          error = 'Пользователь не авторизован';
          break;
        case statusCode.NotFound:
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
   * @param {callback} onLoad Функция обратного вызова, которая срабатывает при успешном выполнении запроса.
   * @param {callback} onError Функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
   */
  var load = function (onLoad, onError) {
    var xhr = createXHR(onLoad, onError);
    xhr.open('GET', URL.load);
    xhr.send();
  };

  window.backend = {
    load: load
  };

})();
