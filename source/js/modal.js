'use strict';

(function () {
  var starsField = document.querySelector('.modal__stars');
  var starLabels = starsField.querySelectorAll('label');
  var state = {
    selectedStar: 0,
    hoveredStar: 0,
  };

  var findStar = function (currentLabel) {
    return [].findIndex.call(starLabels, function (label) {
      return label === currentLabel;
    });
  };

  var cleanStars = function () {
    for (var i = 0; i < starLabels.length; i++) {
      starLabels[i].classList.remove('modal__star--selected');
    }
  };

  var drawStars = function (index) {
    for (var i = 0; i <= index; i++) {
      starLabels[i].classList.add('modal__star--selected');
    }
  };

  var onMouseLeave = function () {
    cleanStars();
    drawStars(state.hoveredStar - 1);
  };

  var onMouseEnter = function (evt) {
    state.hoveredStar = findStar(evt.target);
    drawStars(state.hoveredStar);
  };

  var onStarSelect = function (evt) {
    state.selectedStar = findStar(evt.currentTarget);
  };

  var onFormExit = function () {
    cleanStars();
    drawStars(state.selectedStar);
  };

  var onFormEnter = function () {
    cleanStars();
  };

  var handleLabelHover = function (label) {
    label.addEventListener('mouseenter', onMouseEnter);
    label.addEventListener('mouseleave', onMouseLeave);
    label.addEventListener('click', onStarSelect);
  };

  starsField.addEventListener('mouseleave', onFormExit);
  starsField.addEventListener('mouseenter', onFormEnter);

  for (var i = 0; i < starLabels.length; i++) {
    handleLabelHover(starLabels[i]);
  }

})();
