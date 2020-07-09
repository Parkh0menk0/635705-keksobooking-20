'use strict';

window.drag.mainPin.addEventListener('mousedown', window.map.onButtonMousedown, false);
window.drag.mainPin.addEventListener('keydown', window.map.onButtonKeydown, false);
window.form.selectRoomNumber.addEventListener('change', window.form.onSelectRoomNumberChange, false);
window.form.selectType.addEventListener('change', window.form.onSelectRoomPriceChange, false);

window.form.setAddress(window.drag.mainPin);
window.form.setFieldsetState();
window.form.onSelectRoomNumberChange();
window.form.onSelectRoomPriceChange();
