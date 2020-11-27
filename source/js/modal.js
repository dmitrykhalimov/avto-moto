'use strict';

(function () {
  var state = {
    selectedStar: 3,
    hoveredStar: 1,
  };

  var modal = document.querySelector('.modal');
  var starsField = document.querySelector('.modal__stars');
  var starLabels = starsField.querySelectorAll('label');

  var nameField = document.querySelector('#name');
  var prosField = document.querySelector('#pros');
  var contrasField = document.querySelector('#contras');
  var commentField = document.querySelector('#comment');

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

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    var content = document.querySelector('.reviews');
    var dataToRender = {
      name: nameField.value,
      pros: prosField.value,
      contras: contrasField.value,
      comment: commentField.value,
      stars: state.selectedStar,
    };

    var newReview = window.generateReview.create(dataToRender);
    content.insertBefore(newReview, content.firstElementChild);

    closeModal();
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

  var submitButton = document.querySelector('.modal__submit');

  starsField.addEventListener('mouseleave', onFormExit);
  starsField.addEventListener('mouseenter', onFormEnter);
  submitButton.addEventListener('click', onFormSubmit);

  for (var i = 0; i < starLabels.length; i++) {
    handleLabelHover(starLabels[i]);
  }

  var onOpenModal = function () {
    modal.classList.remove('visually-hidden');
  };

  var onCloseButtonClick = function () {
    closeModal();
  };

  var closeModal = function () {
    modal.classList.add('visually-hidden');

    nameField.value = '';
    prosField.value = '';
    contrasField.value = '';
    commentField.value = '';
  };

  var openButton = document.querySelector('.reviews__add-review');
  openButton.addEventListener('click', onOpenModal);

  var closeButton = modal.querySelector('.modal__close');
  closeButton.addEventListener('click', onCloseButtonClick);

})();
