window.Popper = require('popper.js').default;

try {
  window.$ = window.jQuery = require('jquery');

  require('bootstrap');
// eslint-disable-next-line no-empty
} catch (e) {}
