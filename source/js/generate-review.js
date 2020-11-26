'use strict';

(function () {
  var reviewTemplate = document.querySelector('#tempalte-review').content;
  var mockData = {
    name: 'Иван Пупко',
    pros: 'Быстрая, sassy',
    contras: 'Дорогая, Бензина много',
    comment: 'Тачан супер за певандриком ездить',
    stars: 1,
  };

  var createReview = function (reviewData) {
    var review = reviewTemplate.cloneNode(true);

    review.querySelector('b').textContent = reviewData.name;
    review.querySelector('dt').textContent = reviewData.pros;
    review.querySelector('dt:last-of-type').textContent = reviewData.contras;
    review.querySelector('p').textContent = reviewData.comment;

    [].forEach.call(review.querySelectorAll('img'), function (image, index) {
      var starColor = reviewData.stars > index ? 'red' : 'gray';
      image.src = './img/icon-star-' + starColor + '.svg';
    });

    return review;
  };

  window.generateReview = {
    create: createReview
  };
})();
