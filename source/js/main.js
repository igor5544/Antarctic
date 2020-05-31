'use strict';

(function () {

  var Key = {
    ESC: 27
  };

  function trackEscEvent(evt, action) {
    if (evt.keyCode === Key.ESC) {
      action();
    }
  }

  window.util = {
    trackEscEvent: trackEscEvent
  };

})();

(function () {

  var headerElement = document.querySelector('.header');
  var headerLogoElement = document.querySelector('.header__logo');
  var headerToggleElement = headerElement.querySelector('.header__toggle-btn');
  var headerBurgerElement = headerElement.querySelector('.header__toggle');
  var headerMenuElement = headerElement.querySelector('.header__nav');
  var headerMenuButtonsElements = headerMenuElement.querySelectorAll('.nav-list__link');

  removeNojs();

  function removeNojs() {
    headerElement.classList.remove('header--nojs');
    headerLogoElement.classList.remove('header__logo--nojs');
    headerToggleElement.classList.remove('header__toggle-btn--nojs');
    headerMenuElement.classList.remove('header__nav--nojs');
  }

  headerToggleElement.addEventListener('click', function () {

    if (headerMenuElement.classList.contains('header__nav--menu-active')) {
      closeMainMenu();
    } else {
      openMainMenu();
    }

  });

  Array.prototype.slice.call(headerMenuButtonsElements).forEach(function (menuButton) {
    menuButton.addEventListener('click', function () {
      if (headerMenuElement.classList.contains('header__nav--menu-active')) {
        headerToggleElement.click();
      }
    });
  });

  function openMainMenu() {
    document.body.style.overflow = 'hidden';

    toggleMainMenu();

    document.addEventListener('keydown', onMainMenuEscPress);
  }

  function closeMainMenu() {
    document.body.style.overflow = '';

    toggleMainMenu();

    document.removeEventListener('keydown', onMainMenuEscPress);
  }

  function toggleMainMenu() {
    headerElement.classList.toggle('header--menu-active');
    headerLogoElement.classList.toggle('header__logo--menu-active');
    headerToggleElement.classList.toggle('header__toggle-btn--closed');
    headerBurgerElement.classList.toggle('header__toggle--closed');
    headerMenuElement.classList.toggle('header__nav--menu-active');
  }

  function onMainMenuEscPress(evt) {
    window.util.trackEscEvent(evt, closeMainMenu);
  }

})();

(function () {

  var mainFormElement = document.querySelector('.main-form');
  var nameFieldElement = mainFormElement.querySelector('input[type="text"]');
  var phoneFieldElement = mainFormElement.querySelector('input[type="tel"]');
  var emailFieldElement = mainFormElement.querySelector('input[type="email"]');

  var isStorageSupport = true;
  var storageName;
  var storagePhone;
  var storageEmail;

  /* $('input[type="tel"]').mask('+7(000) 000-0000'); */

  try {
    storageName = localStorage.getItem('userName');
  } catch (err) {
    isStorageSupport = false;
  }

  try {
    storagePhone = localStorage.getItem('userPhone');
  } catch (err) {
    isStorageSupport = false;
  }

  try {
    storageEmail = localStorage.getItem('userEmail');
  } catch (err) {
    isStorageSupport = false;
  }

  setFormValueFromStoreg();

  mainFormElement.addEventListener('submit', function () {
    if (isStorageSupport) {
      localStorage.setItem('userName', nameFieldElement.value);
      localStorage.setItem('userPhone', phoneFieldElement.value);
      localStorage.setItem('userEmail', emailFieldElement.value);
    }
  });

  function setFormValueFromStoreg() {
    if (storageName) {
      nameFieldElement.value = storageName;
    }

    if (storageEmail) {
      phoneFieldElement.value = storageEmail;
    }

    if (storagePhone) {
      emailFieldElement.value = storagePhone;
    }
  }

})();
