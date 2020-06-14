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

var OFFSET = {
  x: 25,
  y: 70
};

var map = document.querySelector('.map');
var filtersContainer = map.querySelector('.map__filters-container');

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
 * @description Генерирует массив случайной длины.
 * @param {Object[]} array Массив фиксированной длины.
 * @return {Object[]} Массив случайной длины.
 */
function randomLengthArray(array) {
  var arr = [];
  for (var j = 0; j < randomInteger(1, array.length); j++) {
    arr.push(array[j]);
  }
  return arr;
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
    var location = {
      'x': randomInteger(0, 1150),
      'y': randomInteger(130, 630)
    };
    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'location': location,
      'offer': {
        'title': title[i],
        'address': location.x + ', ' + location.y,
        'price': randomInteger(1000, 1000000),
        'type': type[randomInteger(0, type.length - 1)],
        'rooms': randomInteger(1, 5),
        'guests': randomInteger(1, Number.MAX_SAFE_INTEGER),
        'checkin': time[randomInteger(0, time.length - 1)],
        'checkout': time[randomInteger(0, time.length - 1)],
        'features': randomLengthArray(features),
        'description': '',
        'photos': randomLengthArray(photos)
      }
    };

    ads.push(ad);
  }

  return ads;
}

/**
 * @description Создаёт DOM-элементы отметок на карте на основе JS-объекта.
 * @param {Object[]} generated Сгенерированный массив объявлений.
 * @return {Object} DocumentFragment.
 */
function createMarks(generated) {
  var template = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < generated.length; i++) {
    var element = template.cloneNode(true);
    var avatar = element.querySelector('.map__pin img');
    element.style.left = generated[i].location.x - OFFSET.x + 'px';
    element.style.top = generated[i].location.y - OFFSET.y + 'px';
    avatar.src = generated[i].author.avatar;
    avatar.alt = generated[i].offer.title;
    fragment.appendChild(element);
  }

  return fragment;
}

/**
 * @description Создаёт DOM-элемент карточеки объявления на основе первого элемента массива JS-объектов.
 * @param {Object[]} generated Сгенерированный массив объявлений.
 * @return {Object} DocumentFragment.
 */
function createCard(generated) {
  var template = document.querySelector('#card').content.querySelector('article');
  var fragment = document.createDocumentFragment();
  var element = template.cloneNode(true);
  var first = generated[0];
  var avatar = element.querySelector('.popup__avatar');
  var photos = element.querySelector('.popup__photos');

  element.querySelector('.popup__title').textContent = first.offer.title;
  element.querySelector('.popup__text--address').textContent = first.offer.address;
  element.querySelector('.popup__text--price').textContent = first.offer.price + '₽/ночь';
  element.querySelector('.popup__type').textContent = first.offer.type;
  element.querySelector('.popup__text--capacity').textContent = first.offer.rooms + ' комнаты для ' + first.offer.guests + ' гостей';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + first.offer.checkin + ', выезд до ' + first.offer.checkout;

  if (first.offer.features.includes('wifi')) {
    element.querySelector('.popup__feature--wifi').textContent = first.offer.features[0];
  } else if (first.offer.features.includes('dishwasher')) {
    element.querySelector('.popup__feature--dishwasher').textContent = first.offer.features[1];
  } else if (first.offer.features.includes('parking')) {
    element.querySelector('.popup__feature--parking').textContent = first.offer.features[2];
  } else if (first.offer.features.includes('washer')) {
    element.querySelector('.popup__feature--washer').textContent = first.offer.features[3];
  } else if (first.offer.features.includes('elevator')) {
    element.querySelector('.popup__feature--elevator').textContent = first.offer.features[4];
  } else if (first.offer.features.includes('conditioner')) {
    element.querySelector('.popup__feature--conditioner').textContent = first.offer.features[5];
  }

  element.querySelector('.popup__title').textContent = first.offer.title;

  for (var i = 0; i < photos.children.length; i++) {
    if (i > 1) {
      photos.append(document.createElement('img'));
    }
    var photo = photos.children[i];
    photo.src = first.offer.photos[i];
  }

  avatar.src = first.author.avatar;

  fragment.appendChild(element);

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

map.insertBefore(createCard(createAds(ADS_COUNT, TITLE, TYPE, TIME, FEATURES, PHOTOS)), filtersContainer);
