'use strict';


(function () {
  var myMap;

  ymaps.ready(init);

  function init() {
    console.log(ymaps);
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
      // При инициализации карты обязательно нужно указать
      // её центр и коэффициент масштабирования.
      center: [55.76, 37.64], // Москва
      zoom: 10
    }, {
      searchControlProvider: 'yandex#search'
    });
  }
})();


