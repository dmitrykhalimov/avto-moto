'use strict';

(function () {
  // ES5 порождает фрустрацию и огромные модули

  var state = {
    selectedStar: 1,
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
    for (var i = 0; i < index; i++) {
      starLabels[i].classList.add('modal__star--selected');
    }
  };

  var onMouseLeave = function () {
    cleanStars();
    drawStars(state.hoveredStar - 1);
  };

  var onMouseEnter = function (evt) {
    state.hoveredStar = findStar(evt.target) + 1;
    drawStars(state.hoveredStar);
  };

  var onStarSelect = function (evt) {
    state.selectedStar = findStar(evt.currentTarget) + 1;
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

    closeModal(true);
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

  // Валидация формы

  var testedInput = document.querySelector('.modal__input-required');
  console.log(testedInput);
  testedInput.value = 'Пипкин';
  console.log(testedInput.validity);

  // функции открытия-закрытия модального окна
  var closeModal = function (isFinished) {
    modal.classList.add('visually-hidden');

    if (!isFinished) {
      return;
    }

    nameField.value = '';
    prosField.value = '';
    contrasField.value = '';
    commentField.value = '';
    state = {
      selectedStar: 1,
      hoveredStar: 1,
    };

    closeButton.removeEventListener('click', onCloseButtonClick);
    modal.removeEventListener('click', onOverlayClick);
    document.removeEventListener('keydown', onEscKeyDown);
  };

  var openModal = function () {
    modal.classList.remove('visually-hidden');
    drawStars(state.selectedStar);

    closeButton.addEventListener('click', onCloseButtonClick);
    modal.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onEscKeyDown);
  };

  // обработчики открытия-закрытия формы
  var closeButton = modal.querySelector('.modal__close');

  var onOverlayClick = function (evt) {
    if (evt.target !== modal) {
      return;
    }
    closeModal(false);
  };

  var onEscKeyDown = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeModal(false);
    }
  };

  var onCloseButtonClick = function () {
    closeModal(false);
  };

  var onOpenModal = function () {
    openModal();
  };

  var openButton = document.querySelector('.reviews__add-review');
  openButton.addEventListener('click', onOpenModal);
})();
