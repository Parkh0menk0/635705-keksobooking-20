'use strict';

(function () {

  /**
   * @description Добавляет фотографии DOM-элементу.
   * @param {Object[]} data Фотографии.
   * @return {Object} Объект DocumentFragment.
   */
  var setPhotoContent = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.style.width = '45px';
      img.style.height = '40px';
      fragment.appendChild(img);
    }

    return fragment;
  };

  /**
   * @description Удаляет активный класс карточки.
   */
  var removeActiveClass = function () {
    var active = document.querySelector('.map__pin--active');

    if (active) {
      active.classList.remove('map__pin--active');
    }
  };

  /**
   * @description Создаёт DOM-элемент карточеки объявления на основе элементов массива JS-объектов.
   * @param {Object} cardData Сгенерированный массив объявлений.
   * @return {Object} Объект DocumentFragment.
   */
  var createCard = function (cardData) {
    var template = document.querySelector('#card').content.querySelector('article');
    var element = template.cloneNode(true);
    var avatar = element.querySelector('.popup__avatar');
    var photos = element.querySelector('.popup__photos');

    var title = element.querySelector('.popup__title');
    if (cardData.offer.title) {
      title.textContent = cardData.offer.title;
    } else {
      title.remove();
    }

    var address = element.querySelector('.popup__text--address');
    if (cardData.offer.address) {
      address.textContent = cardData.offer.address;
    } else {
      address.remove();
    }

    var price = element.querySelector('.popup__text--price');
    if (cardData.offer.price) {
      price.textContent = cardData.offer.price + ' ₽/ночь';
    } else {
      price.remove();
    }

    var type = element.querySelector('.popup__type');
    if (cardData.offer.type) {
      type.textContent = window.form.types[cardData.offer.type].ru;
    } else {
      type.remove();
    }

    var capacity = element.querySelector('.popup__text--capacity');
    if (cardData.offer.capacity) {
      capacity.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    } else {
      capacity.remove();
    }

    var time = element.querySelector('.popup__text--time');
    if (cardData.offer.capacity) {
      time.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    } else {
      time.remove();
    }

    var features = Array.from(element.querySelectorAll('.popup__feature'));

    features.forEach(function (feature, j) {
      if (cardData.offer.features[j]) {
        feature.textContent = cardData.offer.features[j];
      } else {
        feature.style = 'display: none';
      }
    });

    element.querySelector('.popup__title').textContent = cardData.offer.title;
    photos.innerHTML = '';
    photos.appendChild(setPhotoContent(cardData.offer.photos));

    avatar.src = cardData.author.avatar;

    element.querySelector('.popup__close').addEventListener('click', function () {
      window.map.removeCard();
      removeActiveClass();
    }, false);

    return element;
  };

  window.card = {
    removeActiveClass: removeActiveClass,
    create: createCard
  };

})();
