'use strict';


(function () {
  var myMap;

  window.ymaps.ready(init);

  function init() {
    // инициализация карты
    myMap = new window.ymaps.Map('map', {
      center: [59.968137, 30.316263],
      zoom: 15,
      controls: []
    }, {
      searchControlProvider: 'yandex#search'
    });

    // метка
    var point = new window.ymaps.Placemark([59.968137, 30.316263], {
      balloonContent: 'Изумительный салон Avto-Moto: Санкт-Петербург, набережная реки Карповки, дом 5'
    }, {
      preset: 'islands#darkOrangeDotIcon'
    });
    myMap.geoObjects.add(point);
  }
})();


