'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var inputAvatar = document.querySelector('.ad-form-header__input');
  var destinationAvatar = document.querySelector('.ad-form-header__preview img');
  var inputHousing = document.querySelector('.ad-form__input');
  var destinationHousing = document.querySelector('.ad-form__photo');

  /**
   * @description Проверяет, оканчивается ли имя файла одним из допустимых расширений.
   * @param {Object} uploadFile Растровое изображение.
   * @return {Boolean} Булево значение, было ли совпадение.
   */
  var matches = function (uploadFile) {
    return FILE_TYPES.some(function (it) {
      return uploadFile.name.toLowerCase().endsWith(it);
    });
  };

  inputAvatar.addEventListener('change', function () {
    var file = inputAvatar.files[0];

    if (matches(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        destinationAvatar.src = reader.result;
      }, false);

      reader.readAsDataURL(file);
    }
  }, false);

  inputHousing.addEventListener('change', function () {
    var file = inputHousing.files[0];

    if (matches(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var img = document.createElement('img');
        img.style.width = '70px';
        img.style.height = '70px';
        img.style.borderRadius = '5px';
        img.src = reader.result;
        destinationHousing.append(img);
      }, false);

      reader.readAsDataURL(file);
    }
  }, false);

})();
