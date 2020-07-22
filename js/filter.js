'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters');

  var priceMap = {
    'low': {
      start: 0,
      end: 10000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };

  var filterElements = Array.from(document.querySelector('.map__filters').children);

  var filterRule = {
    'housing-type': function (data, filter) {
      return filter.value === data.offer.type;
    },
    'housing-price': function (data, filter) {
      return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    },
    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },
    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },
    'housing-features': function (data, filter) {
      var checkListElements = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));
      return checkListElements.every(function (item) {
        return data.offer.features.some(function (feature) {
          return feature === item.value;
        });
      });
    }
  };

  /**
   * @description Выполняет отрисовку отметок на карте после фильтрации.
   * @param {Object[]} data Массив объектов.
   * @return {Object} Отфильтрованный массив объектов.
   */
  var filterData = function (data) {
    return data.filter(function (item) {
      return filterElements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRule[filter.id](item, filter);
      });
    });
  };

  filterElements.forEach(function (item) {
    item.addEventListener('change', window.pin.update, false);
  });

  mapFilters.addEventListener('change', window.debounce(function () {
    window.pin.remove();
    window.map.removeCard();
    window.pin.update();
  }, false));

  window.filter = filterData;

})();
