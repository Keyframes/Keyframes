(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

var _keyframes = _interopRequireDefault(require("../src/keyframes"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var ball = new _keyframes.default(document.getElementById('ball'));

_keyframes.default.define([{
  name: 'ball-move',
  '0%': {
    'margin-left': '0px'
  },
  '50%': {
    'margin-left': '600px'
  },
  '100%': {
    'margin-left': '0px'
  }
}, {
  name: 'ball-spin',
  from: {
    transform: 'rotate(90deg)'
  },
  to: {
    transform: 'rotate(450deg)'
  }
}]);

window.pause = function () {
  ball.pause();
};

window.resume = function () {
  ball.resume();
};

window.reset = function () {
  ball.reset();
};

var cbElem = document.getElementById('cb');

function increment() {
  cbElem.innerHTML = parseInt(cbElem.innerHTML, 10) + 1;
}

window.play = function (animation) {
  ball.reset(function () {
    switch (animation) {
      case 'normal':
        ball.play({
          name: 'ball-move',
          duration: '3s',
          timingFunction: 'ease',
          iterationCount: 'infinite',
          direction: 'normal',
          fillMode: 'forwards',
          complete: increment
        });
        break;

      case 'spin':
        ball.play('ball-spin 500ms linear 0s 3 normal forwards', increment);
        break;

      case 'linear':
        ball.play({
          name: 'ball-move',
          duration: '3s',
          timingFunction: 'linear',
          iterationCount: 'infinite',
          complete: increment
        });
        break;

      case 'delay':
        ball.play({
          name: 'ball-move',
          duration: '3s',
          timingFunction: 'linear',
          delay: '3s',
          iterationCount: 'infinite',
          complete: increment
        });
        break;

      case 'once':
        ball.play({
          name: 'ball-move',
          duration: '3s',
          timingFunction: 'ease',
          complete: increment
        });
        break;

      case 'multi':
        ball.play(['ball-spin 500ms linear 0s 6', {
          name: 'ball-move',
          duration: '3s',
          timingFunction: 'ease',
          iterationCount: 1
        }], increment);
        break;

      default:
      case 'chained':
        ball.play({
          name: 'ball-spin',
          duration: '1s',
          iterationCount: 1,
          complete: function complete() {
            increment();
            setTimeout(function () {
              return ball.play({
                name: 'ball-move',
                duration: '1s',
                iterationCount: 1,
                complete: function complete() {
                  ball.reset();
                  increment();
                }
              });
            }, 1000);
          }
        });
    }
  });
};

},{"../src/keyframes":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Keyframes =
/*#__PURE__*/
function () {
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
        setTimeout(callback, 0);
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

      var animationcss = '';

      if (frameOptions.constructor === Array) {
        var frameOptionsStrings = [];

        for (var i = 0; i < frameOptions.length; i += 1) {
          frameOptionsStrings.push(typeof frameOptions[i] === 'string' ? frameOptions[i] : animObjToStr(frameOptions[i]));
        }

        animationcss = frameOptionsStrings.join(', ');
      } else if (typeof frameOptions === 'string') {
        animationcss = frameOptions;
      } else {
        animationcss = animObjToStr(frameOptions);
      }

      return animationcss;
    }
  }, {
    key: "generateCSS",
    value: function generateCSS(frameData) {
      var frameName = frameData.name || '';
      var css = "@keyframes ".concat(frameName, " {");

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
      var frameName = frameData.name || '';
      var css = this.generateCSS(frameData);
      var oldFrameIndex = Keyframes.rules.indexOf(frameName);

      if (oldFrameIndex > -1) {
        Keyframes.sheet.deleteRule(oldFrameIndex);
        delete Keyframes.rules[oldFrameIndex];
      }

      var ruleIndex = Keyframes.sheet.insertRule(css);
      Keyframes.rules[ruleIndex] = frameName;
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
      pluginFunc(Keyframes);
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

},{}]},{},[1]);
