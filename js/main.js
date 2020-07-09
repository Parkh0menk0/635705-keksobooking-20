'use strict';

window.map.mainPin.addEventListener('mousedown', window.map.onButtonMousedown, false);
window.map.mainPin.addEventListener('keydown', window.map.onButtonKeydown, false);
window.form.selectRoomNumber.addEventListener('change', window.form.onSelectRoomNumberChange, false);
window.form.selectType.addEventListener('change', window.form.onSelectRoomPriceChange);

window.form.setAddress(window.map.mainPin);
window.form.setFieldsetState();
window.form.onSelectRoomNumberChange();
window.form.onSelectRoomPriceChange();
