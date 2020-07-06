'use strict';

var BUTTON = {
  enter: 'Enter',
  esc: 'Escape'
};

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

var types = {
  palace: {
    ru: 'Дворец',
    min: 10000
  },
  flat: {
    ru: 'Квартира',
    min: 1000
  },
  house: {
    ru: 'Дом',
    min: 5000
  },
  bungalo: {
    ru: 'Бунгало',
    min: 0
  }
};

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

var ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

var ads = createAds(ADS_COUNT, TITLE, TYPE, TIME, FEATURES, PHOTOS);

var selectRoomNumber = document.querySelector('#room_number');
var selectCapacity = document.querySelector('#capacity');
var selectType = document.querySelector('#type');
var selectPrice = document.querySelector('#price');
var selectTimein = document.querySelector('#timein');
var selectTimeout = document.querySelector('#timeout');

var map = document.querySelector('.map');
var filtersContainer = map.querySelector('.map__filters-container');
var mainPin = map.querySelector('.map__pin--main');
var fieldsets = document.querySelectorAll('.ad-form__element');
var form = document.querySelector('.ad-form');
var address = form.querySelector('input[name=address]');

/**
 * @description Проверяет активна ли страница.
 * @return {boolean} Активна или нет страница.
 */
function checkMapState() {
  return map.classList.contains('map--faded');
}

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
}

/**
 * @description Удаляет карточку.
 */
function removeCard() {
  var popup = map.querySelector('.popup');

  if (popup) {
    popup.remove();
  }
}

/**
 * @description Удаляет активный класс карточки.
 */
function removeActiveClass() {
  var active = map.querySelector('.map__pin--active');

  if (active) {
    active.classList.remove('map__pin--active');
  }
}

/**
 * @description Создаёт DOM-элемент отметки на карте на основе JS-объекта.
 * @param {Object} pin Обьект сгенерированного массива объявлений.
 * @return {Object} DOM-элемент отметки на карте.
 */
function createMark(pin) {
  var template = document.querySelector('#pin').content.querySelector('button');
  var element = template.cloneNode(true);
  var avatar = element.querySelector('.map__pin img');
  element.style.left = pin.location.x - OFFSET.x + 'px';
  element.style.top = pin.location.y - OFFSET.y + 'px';
  avatar.src = pin.author.avatar;
  avatar.alt = pin.offer.title;

  element.addEventListener('click', function () {
    removeCard();

    removeActiveClass();

    element.classList.add('map__pin--active');

    showCard(pin);
  });

  return element;
}

/**
 * @description Создаёт DOM-элементы отметок на карте на основе JS-объекта.
 * @param {Object[]} generated Сгенерированный массив объявлений.
 */
function createMarks() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createMark(ads[i]));
  }

  var list = document.querySelector('.map__pins');

  list.appendChild(fragment);
}

/**
 * @description Добавляет фотографии DOM-элементу.
 * @param {Object} photos DOM-элемент, содержащий фото.
 * @param {Object[]} photoArr Массив, содержащий фото.
 */
function setPhotoContent(photos, photoArr) {
  for (var i = 0; i < photoArr.length; i++) {
    if (i >= 1) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.style.width = '45px';
      img.style.height = '40px';
      photos.append(img);
    }
    var photo = photos.children[i];
    photo.src = photoArr[i];
  }
}

/**
 * @description Создаёт DOM-элемент карточеки объявления на основе первого элемента массива JS-объектов.
 * @param {Object} cardData Сгенерированный массив объявлений.
 * @return {Object} DocumentFragment.
 */
function createCard(cardData) {
  var template = document.querySelector('#card').content.querySelector('article');
  var element = template.cloneNode(true);
  var avatar = element.querySelector('.popup__avatar');
  var photos = element.querySelector('.popup__photos');

  element.querySelector('.popup__title').textContent = cardData.offer.title;
  element.querySelector('.popup__text--address').textContent = cardData.offer.address;
  element.querySelector('.popup__text--price').textContent = cardData.offer.price + ' ₽/ночь';
  element.querySelector('.popup__type').textContent = types[cardData.offer.type].ru;
  element.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;

  var features = element.querySelectorAll('.popup__feature');
  for (var j = 0; j < features.length; j++) {
    if (cardData.offer.features[j]) {
      features[j].textContent = cardData.offer.features[j];
    } else {
      features[j].style = 'display: none;';
    }
  }

  element.querySelector('.popup__title').textContent = cardData.offer.title;
  setPhotoContent(photos, cardData.offer.photos);

  avatar.src = cardData.author.avatar;

  return element;
}

/**
 * Callback-функция, для активации страницы левой кнопкой мыши.
 * @callback onButtonMousedown
 * @param {Object} evt событие, которое происходит в DOM.
 */
function onButtonMousedown(evt) {
  if (evt.button === 0) {
    setActiveState();
    setAddress(mainPin);
  }
  mainPin.removeEventListener('mousedown', onButtonMousedown, false);
}

/**
 * Callback-функция, для активации страницы клавишей Enter.
 * @callback onButtonMousedown
 * @param {Object} evt событие, которое происходит в DOM.
 */
function onButtonKeydown(evt) {
  if (evt.key === BUTTON.enter) {
    setActiveState();
  }
  mainPin.removeEventListener('keydown', onButtonKeydown, false);
}

/**
 * Callback-функция, устанавливает соответствия количества гостей (спальных мест) с количеством комнат.
 * @callback onSelectRoomNumberChange
 */
function onSelectRoomNumberChange() {
  if (selectCapacity.options.length) {
    Array.from(selectCapacity.options).forEach(function (item) {
      var value = ROOMS_CAPACITY[selectRoomNumber.value];
      var isHidden = !(value.indexOf(item.value) >= 0);

      item.hidden = isHidden;
      item.disabled = isHidden;
      item.selected = value[0] === item.value;
    });
  }
}

/**
 * Callback-функция, устанавливает соответствия цуны и жилья.
 * @callback onSelectRoomNumberChange
 */
function onSelectRoomPriceChange() {
  if (selectType.options.length) {
    selectPrice.min = types[selectType.value].min;
    selectPrice.placeholder = types[selectType.value].min;
  }
}

/**
 * @description Устанавливает значения поля ввода адреса.
 * @param {Object} pin Объект метки.
 * @param {boolean} state Флаг, указывающий6 активна ли страница.
 */
function setAddress(pin) {
  address.style.cursor = 'not-allowed';
  address.value = checkMapState() ? (Math.round(pin.offsetLeft + pin.clientWidth / 2)) + ', ' + (Math.round(pin.offsetTop + pin.clientHeight / 2)) : address.value = (Math.round(pin.offsetLeft + pin.clientWidth / 2)) + ', ' + (pin.offsetTop + pin.clientHeight);
}

function onCardEscKeyDown(evt) {
  if (evt.key === BUTTON.esc) {
    evt.preventDefault();
    removeCard();
    removeActiveClass();
    document.removeEventListener('keydown', onCardEscKeyDown);
  }
}

/**
 * @description Отрисовывает карточку объявления.
 * @param {Node} pin DOM-узел объявлений.
 */
function showCard(pin) {
  var fragment = document.createDocumentFragment();

  fragment.appendChild(createCard(pin));

  map.insertBefore(fragment, filtersContainer);

  document.addEventListener('keydown', onCardEscKeyDown);
}

/**
 * @description Закрывает модальное окно.
 * @param {Node} card DOM-узел карточки.
 */
function hideCard(card) {
  card.classList.add('hidden');
}

function setFieldsetState() {
  fieldsets.forEach(function (fieldset) {
    fieldset.disabled = !fieldset.disabled;
  });
}

/**
 * @description Переводит страницу в активное состояние.
 */
function setActiveState() {
  map.classList.remove('map--faded');
  createMarks();
  form.classList.remove('ad-form--disabled');

  setFieldsetState();

  var mapCard = document.querySelectorAll('.map__card');

  Array.from(document.querySelectorAll('.popup__close')).forEach(function (item, i) {
    item.addEventListener('click', function () {
      hideCard(mapCard[i]);
    });
  });
}

selectTimein.addEventListener('change', function () {
  selectTimeout.value = selectTimein.value;
}, false);

selectTimeout.addEventListener('change', function () {
  selectTimein.value = selectTimeout.value;
}, false);

mainPin.addEventListener('mousedown', onButtonMousedown, false);
mainPin.addEventListener('keydown', onButtonKeydown, false);
selectRoomNumber.addEventListener('change', onSelectRoomNumberChange, false);
selectType.addEventListener('change', onSelectRoomPriceChange);

setAddress(mainPin);
setFieldsetState();
onSelectRoomNumberChange();
onSelectRoomPriceChange();
