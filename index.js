'use strict';

function Component() {}

Component.prototype.view = require('./index.jade');

function getElement(name) {
  return window.document.querySelector(
    'meta[name="' + name + '"]'
  );
}

Component.prototype.create = function (model) {
  model.on('change', '_name', this._onChangeMetaName.bind(this));
  model.on('change', 'name', this._onChangeMetaName.bind(this));
  model.on('change', 'content', this._onChangeMetaContent.bind(this));

  var el = getElement(this._getMetaName());

  if (!el) {
    el = window.document.querySelector('head').appendChild(
      window.document.createElement('meta')
    );
  }

  el.name = this._getMetaName();
  el.content = this.getAttribute('content') || '';
};

Component.prototype.destroy = function () {
  var el = getElement(this._getMetaName());
  if (el) el.remove();
};

Component.prototype._getMetaName = function () {
  return (this.getAttribute('_name') || this.getAttribute('name'))
};

Component.prototype._onChangeMetaName = function (nextName, prevName) {
  if (!prevName) return;
  var el = getElement(prevName);
  if (!el) return;
  el.name = this._getMetaName();
};

Component.prototype._onChangeMetaContent = function (content) {
  var el = getElement(this._getMetaName());
  if (!el) return;
  el.content = (this.getAttribute('content') || '');
};

module.exports = Component;
