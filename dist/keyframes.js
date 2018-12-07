(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

require('es6-object-assign/auto');

var Keyframes = function () {
  function Keyframes(elem) {
    _classCallCheck(this, Keyframes);

    this.elem = elem;
  }

  _createClass(Keyframes, [{
    key: "isSupported",
    value: function isSupported() {
      return document.body.style.animationName !== undefined;
    }
  }, {
    key: "reset",
    value: function reset(callback) {
      this.removeEvents();
      this.elem.style.animationPlayState = 'running';
      this.elem.style.animation = 'none';

      if (callback) {
        requestAnimationFrame(callback);
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      this.elem.style.animationPlayState = 'paused';
    }
  }, {
    key: "resume",
    value: function resume() {
      this.elem.style.animationPlayState = 'running';
    }
  }, {
    key: "play",
    value: function play(frameOptions, callback) {
      var _this = this;

      if (this.elem.style.animationName === frameOptions.name) {
        this.reset(function () {
          return _this.play(frameOptions, callback);
        });
        return this;
      }

      var animationcss = Keyframes.playCSS(frameOptions);

      var addEvent = function addEvent(type, eventCallback) {
        var listenerName = "".concat(type, "Listener");

        _this.elem.removeEventListener(type, _this[listenerName]);

        _this[listenerName] = eventCallback;

        _this.elem.addEventListener(type, _this[listenerName]);
      };

      this.elem.style.animationPlayState = 'running';
      this.elem.style.animation = animationcss;
      this.frameOptions = frameOptions;
      addEvent('animationiteration', callback || frameOptions.complete);
      addEvent('animationend', callback || frameOptions.complete);
      return this;
    }
  }, {
    key: "removeEvents",
    value: function removeEvents() {
      this.elem.removeEventListener('animationiteration', this.animationiterationListener);
      this.elem.removeEventListener('animationend', this.animationendListener);
    }
  }], [{
    key: "playCSS",
    value: function playCSS(frameOptions) {
      var animObjToStr = function animObjToStr(obj) {
        var newObj = Object.assign({}, {
          duration: '0s',
          timingFunction: 'ease',
          delay: '0s',
          iterationCount: 1,
          direction: 'normal',
          fillMode: 'forwards'
        }, obj);
        return [newObj.name, newObj.duration, newObj.timingFunction, newObj.delay, newObj.iterationCount, newObj.direction, newObj.fillMode].join(' ');
      };

      if (frameOptions.constructor === Array) {
        var frameOptionsStrings = [];

        for (var i = 0; i < frameOptions.length; i += 1) {
          frameOptionsStrings.push(typeof frameOptions[i] === 'string' ? frameOptions[i] : animObjToStr(frameOptions[i]));
        }

        return frameOptionsStrings.join(', ');
      }

      if (typeof frameOptions === 'string') {
        return frameOptions;
      }

      return animObjToStr(frameOptions);
    }
  }, {
    key: "generateCSS",
    value: function generateCSS(frameData) {
      var css = "@keyframes ".concat(frameData.name, " {");

      for (var key in frameData) {
        if (key !== 'name' && key !== 'media' && key !== 'complete') {
          css += "".concat(key, " {");

          for (var property in frameData[key]) {
            css += "".concat(property, ":").concat(frameData[key][property], ";");
          }

          css += '}';
        }
      }

      css += '}';

      if (frameData.media) {
        css = "@media ".concat(frameData.media, "{").concat(css, "}");
      }

      return css;
    }
  }, {
    key: "generate",
    value: function generate(frameData) {
      var css = this.generateCSS(frameData);
      var oldFrameIndex = Keyframes.rules.indexOf(frameData.name);

      if (oldFrameIndex > -1) {
        Keyframes.sheet.deleteRule(oldFrameIndex);
        delete Keyframes.rules[oldFrameIndex];
      }

      var ruleIndex = Keyframes.sheet.insertRule(css, 0);
      Keyframes.rules[ruleIndex] = frameData.name;
    }
  }, {
    key: "define",
    value: function define(frameData) {
      if (frameData.length) {
        for (var i = 0; i < frameData.length; i += 1) {
          this.generate(frameData[i]);
        }
      } else {
        this.generate(frameData);
      }
    }
  }, {
    key: "defineCSS",
    value: function defineCSS(frameData) {
      if (frameData.length) {
        var css = '';

        for (var i = 0; i < frameData.length; i += 1) {
          css += this.generateCSS(frameData[i]);
        }

        return css;
      }

      return this.generateCSS(frameData);
    }
  }, {
    key: "plugin",
    value: function plugin(pluginFunc) {
      if (pluginFunc.constructor === Array) {
        for (var i = 0; i < pluginFunc.length; i += 1) {
          pluginFunc[i](Keyframes);
        }
      } else {
        pluginFunc(Keyframes);
      }
    }
  }]);

  return Keyframes;
}();

if (typeof document !== 'undefined') {
  var style = document.createElement('style');
  style.setAttribute('id', 'keyframesjs-stylesheet');
  document.head.appendChild(style);
  Keyframes.sheet = style.sheet;
  Keyframes.rules = [];
}

var _default = Keyframes;
exports.default = _default;

},{"es6-object-assign/auto":2}],2:[function(require,module,exports){
'use strict';

require('./index').polyfill();

},{"./index":3}],3:[function(require,module,exports){
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */

'use strict';

function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};

},{}]},{},[1]);
