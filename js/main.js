"use strict";

var ADS_COUNT = 8;

var TITLE = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
]

var TYPE = [
  "palace",
  "flat",
  "house",
  "bungalo"
];

var TIME = [
  "12:00",
  "13:00",
  "14:00"
];

var FEATURES = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
]

var PHOTOS = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
]

/**
 * @description Генерирует случайные данные.
 * @param {number} min Минимальное целое число.
 * @param {number} max Максимальное целое число.
 * @return {number} Случайное целое число.
 */
function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

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
function createAds(count, title, type, time, features, photos) {
  var ads = [];
  for (var i = 0; i < count; i++) {
    ads.push(
      {
        "author": {
          "avatar": "img/avatars/user0" + (++i) + ".png"
        },
        "offer": {
          "title": title[i],
          "address": location.x + ", " + location.y,
          "price": randomInteger(1000, 1000000),
          "type": type[randomInteger(0, type.length - 1)],
          "rooms": randomInteger(1, 5),
          "guests": randomInteger(1, Number.MAX_SAFE_INTEGER),
          "checkin": time[randomInteger(0, time.length - 1)],
          "checkout": time[randomInteger(0, time.length - 1)],
          "features": features,
          "description": "",
          "photos": photos
        },
        "location": {
          "x": randomInteger(130, 630),
          "y": randomInteger(130, 630)
        }
      }
    );
  }
  return ads;
}
