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
// var filtersContainer = map.querySelector('.map__filters-container');
var mainPin = document.querySelector('.map__pin--main');
var fieldsets = document.querySelectorAll('.ad-form__element');

/**
 * @description Генерирует случайные данные.
 * @param {number} min Минимальное целое число.
 * @param {number} max Максимальное целое число.
 * @return {number} Случайное целое число.
 */
function getRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/**
 * @description Генерирует массив случайной длины.
 * @param {Object[]} array Массив фиксированной длины.
 * @return {Object[]} Массив случайной длины.
 */
function getRandomLengthArray(array) {
  var arr = [];
  for (var j = 0; j < getRandomInteger(1, array.length); j++) {
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
      'x': getRandomInteger(0, 1150),
      'y': getRandomInteger(130, 630)
    };
    var ad = {
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
 * @description Добавляет значение DOM-элементу.
 * @param {Object} element Элемент DOM.
 * @param {String} value Текстовое значение.
 */
// function setTextContent(element, value) {
//   element.textContent = value;
// }

/**
 * @description Добавляет фотографии DOM-элементу.
 * @param {Object} photos DOM-элемент, содержащий фото.
 * @param {Object[]} photoArr Массив, содержащий фото.
 */
// function setPhotoContent(photos, photoArr) {
//   for (var i = 0; i < photoArr.length; i++) {
//     if (i >= 1) {
//       var img = document.createElement('img');
//       img.classList.add('popup__photo');
//       img.style.width = '45px';
//       img.style.height = '40px';
//       photos.append(img);
//     }
//     var photo = photos.children[i];
//     photo.src = photoArr[i];
//   }
// }

/**
 * @description Создаёт DOM-элемент карточеки объявления на основе первого элемента массива JS-объектов.
 * @param {Object} firstCard Сгенерированный массив объявлений.
 * @return {Object} DocumentFragment.
 */
// function createCard(firstCard) {
//   var template = document.querySelector('#card').content.querySelector('article');
//   var fragment = document.createDocumentFragment();
//   var element = template.cloneNode(true);
//   var avatar = element.querySelector('.popup__avatar');
//   var photos = element.querySelector('.popup__photos');

//   setTextContent(element.querySelector('.popup__title'), firstCard.offer.title);
//   setTextContent(element.querySelector('.popup__text--address'), firstCard.offer.address);
//   setTextContent(element.querySelector('.popup__text--price'), firstCard.offer.price + '₽/ночь');
//   setTextContent(element.querySelector('.popup__type'), firstCard.offer.type);
//   setTextContent(element.querySelector('.popup__text--capacity'), firstCard.offer.rooms + ' комнаты для ' + firstCard.offer.guests + ' гостей');
//   setTextContent(element.querySelector('.popup__text--time'), 'Заезд после ' + firstCard.offer.checkin + ', выезд до ' + firstCard.offer.checkout);

//   var features = element.querySelectorAll('.popup__feature');
//   for (var j = 0; j < features.length; j++) {
//     if (firstCard.offer.features[j]) {
//       setTextContent(features[j], firstCard.offer.features[j]);
//     } else {
//       features[j].style = 'display: none;';
//     }
//   }

//   setTextContent(element.querySelector('.popup__title'), firstCard.offer.title);
//   setPhotoContent(photos, firstCard.offer.photos);

//   avatar.src = firstCard.author.avatar;

//   fragment.appendChild(element);

//   return fragment;
// }

/**
 * @description Заполняет блок DOM-элементами на основе массива JS-объектов.
 * @param {Object} fragment DocumentFragment.
 */
function fillMarks(fragment) {
  var list = document.querySelector('.map__pins');

  list.appendChild(fragment);
}

/**
 * @description Переводит страницу в активное состояние.
 */
function setActiveState() {
  map.classList.remove('map--faded');

  fillMarks(createMarks(createAds(ADS_COUNT, TITLE, TYPE, TIME, FEATURES, PHOTOS)));
}

// map.insertBefore(createCard(createAds(ADS_COUNT, TITLE, TYPE, TIME, FEATURES, PHOTOS)[0]), filtersContainer);

mainPin.addEventListener('mousedown', setActiveState);

fieldsets.forEach(function (fieldset) {
  fieldset.disabled = true;
});
