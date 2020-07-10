'use strict';

(function () {

  /**
   * @description Генерирует случайные данные.
   * @param {number} min Минимальное целое число.
   * @param {number} max Максимальное целое число.
   * @return {number} Случайное целое число.
   */
  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  /**
   * @description Генерирует массив случайной длины.
   * @param {Object[]} array Массив фиксированной длины.
   * @return {Object[]} Массив случайной длины.
   */
  var getRandomLengthArray = function (array) {
    var arr = [];
    for (var j = 0; j < getRandomInteger(1, array.length); j++) {
      arr.push(array[j]);
    }
    return arr;
  };

  /**
   * @description Создаёт массив объектов описания похожего объявления неподалёку.
   * @param {number} count Колличество необходимых для генерирования JS-объектов.
   * @param {Object[]} title Массив заголовоков.
   * @param {Object[]} type Массив типов.
   * @param {Object[]} time Массив времени.
   * @param {Object[]} features Массив предпочтений.
   * @param {Object[]} photos Массив фото.
   * @return {Object[]} Массив объектов описания похожего объявления неподалёку.
   */
  var createAds = function (count, title, type, time, features, photos) {
    var adsArr = [];

    for (var i = 0; i < count; i++) {
      var location = {
        'x': getRandomInteger(0, 1150),
        'y': getRandomInteger(130, 630)
      };
      var adItem = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'location': location,
        'offer': {
          'title': title[i],
          'address': location.x + ', ' + location.y,
          'price': getRandomInteger(1000, 1000000),
          'type': type[getRandomInteger(0, type.length - 1)],
          'rooms': getRandomInteger(1, 5),
          'guests': getRandomInteger(1, Number.MAX_SAFE_INTEGER),
          'checkin': time[getRandomInteger(0, time.length - 1)],
          'checkout': time[getRandomInteger(0, time.length - 1)],
          'features': getRandomLengthArray(features),
          'description': '',
          'photos': getRandomLengthArray(photos)
        }
      };

      adsArr.push(adItem);
    }

    return adsArr;
  };

  window.data = {
    create: createAds
  };

})();
