"use strict";

$(function () {
  console.log('Hello Bootstrap5');
});
"use strict";

var bodyElement = document.querySelector('body');
var mainElement = document.querySelector('main');
var footerElement = document.querySelector('footer.fixed-bottom');
var burger = document.querySelector('.burger');
var bgCircle = document.querySelector('.bg-circle');
burger.classList.add('unToggled');
burger.addEventListener('click', function () {
  burger.classList.toggle('toggled');
  burger.classList.toggle('unToggled');
  bgCircle.classList.toggle('d-none');
  mainElement.classList.toggle('d-none');
  footerElement.classList.toggle('d-none');
});
//# sourceMappingURL=all.js.map
