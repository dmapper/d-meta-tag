'use strict';

function Component() {}

Component.prototype.view = require('./index.jade');

function getElement(name) {
  return window.document.querySelector(
    'meta[name="' + name + '"]'
  );
}

Component.prototype.create = function (model) {
  var self = this;

  model.on('change', 'name', function (nextName, prevName) {
    if (prevName) {
      getElement(prevName).name = self.getAttribute('name');
    }
  });

  model.on('change', 'content', function (content) {
    getElement(self.getAttribute('name')).content = (
      self.getAttribute('content') || ''
    );
  });

  var el = getElement(self.getAttribute('name'));

  if (!el) {
    el = window.document.querySelector('head').appendChild(
      window.document.createElement('meta')
    );
  }

  el.name = self.getAttribute('name');
  el.content = self.getAttribute('content') || '';
};

Component.prototype.destroy = function () {
  var el = getElement(this.getAttribute('name'));
  if (el) el.remove();
};

module.exports = Component;
