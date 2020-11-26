'use strict';

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
