'use strict';

/* инициализация карты */

(function () {
  var myMap;

  window.ymaps.ready(init);

  function init() {
    myMap = new window.ymaps.Map('map', {
      center: [59.968137, 30.316263],
      zoom: 15,
      controls: []
    }, {
      searchControlProvider: 'yandex#search'
    });

    var point = new window.ymaps.Placemark([59.968137, 30.316263], {
      balloonContent: 'Изумительный салон Avto-Moto: Санкт-Петербург, набережная реки Карповки, дом 5'
    }, {
      preset: 'islands#darkOrangeDotIcon'
    });
    myMap.geoObjects.add(point);
  }
})();

// табы
(function () {
  var VISUALLY_HIDDEN = 'visually-hidden';
  var activeTab = '';
  var contentContainer = document.querySelector('.content');
  var tabsContainer = document.querySelector('.tabs');

  var tabs = tabsContainer.querySelectorAll('input');
  var contents = contentContainer.querySelectorAll('section');

  var changeContent = function (selectedName) {
    if (activeTab === selectedName) {
      return;
    }
    activeTab = selectedName;
    [].forEach.call(contents, function (content) {
      if (content.classList.contains(selectedName)) {
        if (content.classList.contains(VISUALLY_HIDDEN)) {
          content.classList.remove(VISUALLY_HIDDEN);
        }
      } else {
        if (!content.classList.contains(VISUALLY_HIDDEN)) {
          content.classList.add(VISUALLY_HIDDEN);
        }
      }
    });
  };

  var onTabClick = function (evt) {
    changeContent(evt.target.id);
  };

  var handleTabSelect = function (tab) {
    tab.addEventListener('click', onTabClick);
  };

  for (var i = 0; i < tabs.length; i++) {
    handleTabSelect(tabs[i]);
  }
})();

/* формирование нового отзыва */

(function () {
  var reviewTemplate = document.querySelector('#tempalte-review').content;
  if (!reviewTemplate) {
    return;
  }

  var createReview = function (reviewData) {
    var review = reviewTemplate.cloneNode(true);

    review.querySelector('b').textContent = reviewData.name;
    review.querySelector('dd').textContent = reviewData.pros;
    review.querySelector('dd:last-of-type').textContent = reviewData.contras;
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

/* модальное окно */
(function () {
  // ES5 порождает фрустрацию и огромные модули

  var state = {
    selectedStar: 1,
    hoveredStar: 1,
  };

  var nameField = document.querySelector('#name');
  var prosField = document.querySelector('#pros');
  var contrasField = document.querySelector('#contras');
  var commentField = document.querySelector('#comment');

  /* звездочки */

  var modal = document.querySelector('.modal');
  var starsField = document.querySelector('.modal__stars');
  var starLabels = starsField.querySelectorAll('label');

  // функции работы со звездочками
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

  // звездочки - события

  // ховер в пределах формы звездочек
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

  // ховер/анховер за пределы блока звездочек, возвращается выбранная оценка
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

  for (var i = 0; i < starLabels.length; i++) {
    handleLabelHover(starLabels[i]);
  }

  /* форма - управление */

  var openButton = document.querySelector('.reviews__add-review');
  var closeButton = modal.querySelector('.modal__close');
  var submitButton = document.querySelector('.modal__submit');

  // функции открытия-закрытия модального окна
  var openModal = function () {
    modal.classList.remove('visually-hidden');
    drawStars(state.selectedStar);

    closeButton.addEventListener('click', onCloseButtonClick);
    modal.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onEscKeyDown);

    starsField.addEventListener('mouseleave', onFormExit);
    starsField.addEventListener('mouseenter', onFormEnter);
    submitButton.addEventListener('click', onFormSubmit);

    modal.querySelector('input').focus();
  };

  var closeModal = function (isFinished) {
    modal.classList.add('visually-hidden');

    if (!isFinished) {
      // если отправки отзыва нет, данные сохраняются
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

    cleanStars();

    closeButton.removeEventListener('click', onCloseButtonClick);
    modal.removeEventListener('click', onOverlayClick);
    document.removeEventListener('keydown', onEscKeyDown);

    starsField.removeEventListener('mouseleave', onFormExit);
    starsField.removeEventListener('mouseenter', onFormEnter);
    submitButton.removeEventListener('click', onFormSubmit);
  };

  // обработчики открытия-закрытия формы

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

  /* форма - ввод */

  // валидация формы
  // написал кастомную, т.к. не нравится срабатывание селектора :focus:invalid + нужно показывать при первом фокусе на required-input

  var requiredContainers = document.querySelectorAll('.modal__required');

  var checkValidityAll = function () {
    var isValid = true;
    [].forEach.call(requiredContainers, function (container) {
      if (!isInputValid(container)) {
        isValid = false;
      }
    });
    return isValid;
  };

  var isInputValid = function (container) {
    var testedInput = container.querySelector('.modal__input');

    if (!testedInput.validity.valid) {
      container.querySelector('span').classList.remove('visually-hidden');
      testedInput.classList.add('modal__input--invalid');
      return false;
    }

    container.querySelector('span').classList.add('visually-hidden');
    testedInput.classList.remove('modal__input--invalid');
    return true;
  };

  // обработчики ввода данных
  var onFormSubmit = function (evt) {
    evt.preventDefault();

    if (!checkValidityAll()) {
      return;
    }

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

  openButton.addEventListener('click', onOpenModal);
})();

// инициализация Swiper.js

(function () {
  // eslint-disable-next-line no-undef
  var galleryThumbs = new Swiper('.gallery-thumbs', {
    slidesPerView: 4,
    spaceBetween: 20,
    freeMode: false,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    wrapperClass: 'slider__thumbnails'
  });

  // eslint-disable-next-line
  var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.slider__next',
      prevEl: '.slider__prev',
      disabledClass: 'slider__disabled',
    },
    thumbs: {
      swiper: galleryThumbs
    }
  });
})();
