'use strict';

(function () {

  /**
   * @description Добавляет фотографии DOM-элементу.
   * @param {Object} photos DOM-элемент, содержащий фото.
   * @param {Object[]} photoArr Массив, содержащий фото.
   */
  var setPhotoContent = function (photos, photoArr) {
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
   * @return {Object} DocumentFragment.
   */
  var createCard = function (cardData) {
    var template = document.querySelector('#card').content.querySelector('article');
    var element = template.cloneNode(true);
    var avatar = element.querySelector('.popup__avatar');
    var photos = element.querySelector('.popup__photos');

    element.querySelector('.popup__title').textContent = cardData.offer.title;
    element.querySelector('.popup__text--address').textContent = cardData.offer.address;
    element.querySelector('.popup__text--price').textContent = cardData.offer.price + ' ₽/ночь';
    element.querySelector('.popup__type').textContent = window.form.types[cardData.offer.type].ru;
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
