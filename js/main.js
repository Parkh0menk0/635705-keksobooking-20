'use strict';

var ADS_COUNT = 8;

var TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var TIME = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map');

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
    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': title[i],
        'address': location.x + ', ' + location.y,
        'price': randomInteger(1000, 1000000),
        'type': type[randomInteger(0, type.length - 1)],
        'rooms': randomInteger(1, 5),
        'guests': randomInteger(1, Number.MAX_SAFE_INTEGER),
        'checkin': time[randomInteger(0, time.length - 1)],
        'checkout': time[randomInteger(0, time.length - 1)],
        'features': features,
        'description': '',
        'photos': photos
      },
      'location': {
        'x': randomInteger(0, 1150),
        'y': randomInteger(130, 630)
      }
    };

    ads.push(ad);
  }

  return ads;
}

/**
 * @description Создаёт DOM-элементы на основе JS-объекта.
 * @param {Object[]} generated Сгенерированный массив объявлений.
 * @return {Object} DocumentFragment.
 */
function createMarks(generated) {
  var template = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < generated.length; i++) {
    var element = template.cloneNode(true);
    var avatar = element.querySelector('.map__pin img');
    element.style.left = generated[i].location.x - element.offsetWidth / 2 + 'px';
    element.style.top = generated[i].location.y - element.offsetHeight / 2 + 'px';
    avatar.src = generated[i].author.avatar;
    avatar.alt = generated[i].offer.title;
    fragment.appendChild(element);
  }

  return fragment;
}

/**
 * @description Заполняет блок DOM-элементами на основе массива JS-объектов.
 * @param {Object} fragment DocumentFragment.
 */
function fillMarks(fragment) {
  var list = document.querySelector('.map__pins');

  list.appendChild(fragment);
}

map.classList.remove('map--faded');

fillMarks(createMarks(createAds(ADS_COUNT, TITLE, TYPE, TIME, FEATURES, PHOTOS)));
