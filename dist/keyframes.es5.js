"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _addPxToStyle = _interopRequireDefault(require("add-px-to-style"));

var _hyphenateStyleName = _interopRequireDefault(require("hyphenate-style-name"));

var wait = function wait() {
  return new Promise(function (accept) {
    requestAnimationFrame(function () {
      accept();
    });
  });
};

var objToCss = function objToCss(obj) {
  var keys = Object.keys(obj);

  if (!keys.length) {
    return '';
  }

  var i,
      result = '';
  var len = keys.length;

  for (i = 0; i < len; i++) {
    var key = keys[i];
    var val = obj[key];
    result += (0, _hyphenateStyleName.default)(key) + ':' + (0, _addPxToStyle.default)(key, val) + ';';
  }

  return result;
};

var Keyframes = function () {
  function Keyframes(elem) {
    (0, _classCallCheck2.default)(this, Keyframes);
    this.elem = elem;
    this.queueStore = [];
  }

  (0, _createClass2.default)(Keyframes, [{
    key: "reset",
    value: function () {
      var _reset = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.removeEvents();
                this.elem.style.animationPlayState = 'running';
                this.elem.style.animation = 'none';
                _context.next = 5;
                return wait();

              case 5:
                return _context.abrupt("return", this);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function reset() {
        return _reset.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: "pause",
    value: function pause() {
      this.elem.style.animationPlayState = 'paused';
      return this;
    }
  }, {
    key: "resume",
    value: function resume() {
      this.elem.style.animationPlayState = 'running';
      return this;
    }
  }, {
    key: "play",
    value: function play(animationOptions, callbacks) {
      var _this = this;

      if (this.elem.style.animationName === this.getAnimationName(animationOptions)) {
        requestAnimationFrame((0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this.reset();

                case 2:
                  _this.play(animationOptions, callbacks);

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        })));
        return this;
      }

      var _ref2 = callbacks || {},
          onBeforeStart = _ref2.onBeforeStart,
          onStart = _ref2.onStart,
          onIteration = _ref2.onIteration,
          onEnd = _ref2.onEnd;

      var animationcss = Keyframes.playCSS(animationOptions);

      var addEvent = function addEvent(type, eventCallback) {
        var listenerName = "".concat(type, "Listener");

        _this.elem.removeEventListener(type, _this[listenerName]);

        _this[listenerName] = eventCallback;

        _this.elem.addEventListener(type, _this[listenerName]);
      };

      if (onBeforeStart) {
        onBeforeStart();
      }

      this.elem.style.animationPlayState = 'running';
      this.elem.style.animation = animationcss;

      if (onIteration) {
        addEvent('animationiteration', onIteration);
      }

      if (onEnd) {
        addEvent('animationend', onEnd);
      }

      if (onStart) {
        requestAnimationFrame(onStart);
      }

      return this;
    }
  }, {
    key: "removeEvents",
    value: function removeEvents() {
      this.elem.removeEventListener('animationiteration', this.animationiterationListener);
      this.elem.removeEventListener('animationend', this.animationendListener);
      return this;
    }
  }, {
    key: "playNext",
    value: function playNext() {
      var _this2 = this;

      var animationOption = this.queueStore.pop();

      if (animationOption) {
        this.play(animationOption, {
          onEnd: function onEnd() {
            return _this2.playNext();
          },
          onIteration: this.callbacks.onIteration
        });
      } else if (this.callbacks.onEnd) {
        this.callbacks.onEnd();
      }
    }
  }, {
    key: "updateCallbacks",
    value: function updateCallbacks(callbacks) {
      if (callbacks) {
        this.callbacks = (0, _objectSpread2.default)({}, this.callbacks, callbacks);
      }
    }
  }, {
    key: "queue",
    value: function queue(animationOptions, callbacks) {
      var currentQueueLength = this.queueStore.length;
      this.updateCallbacks(callbacks);

      if (animationOptions.constructor === Array) {
        this.queueStore = animationOptions.reverse().concat(this.queueStore);
      } else {
        this.queueStore.unshift(animationOptions);
      }

      if (!currentQueueLength) {
        if (this.callbacks.onBeforeStart) {
          this.callbacks.onBeforeStart();
        }

        this.playNext(callbacks);

        if (this.callbacks.onStart) {
          requestAnimationFrame(this.callbacks.onStart);
        }
      }

      return this;
    }
  }, {
    key: "resetQueue",
    value: function () {
      var _resetQueue = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return wait();

              case 2:
                this.removeEvents();
                this.queueStore = [];
                _context3.next = 6;
                return this.reset();

              case 6:
                return _context3.abrupt("return", this);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function resetQueue() {
        return _resetQueue.apply(this, arguments);
      }

      return resetQueue;
    }()
  }, {
    key: "chain",
    value: function () {
      var _chain = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(animationOptions, callbacks) {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.resetQueue();

              case 2:
                this.queue(animationOptions, callbacks);
                return _context4.abrupt("return", this);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function chain(_x, _x2) {
        return _chain.apply(this, arguments);
      }

      return chain;
    }()
  }, {
    key: "getAnimationName",
    value: function getAnimationName(frameOptions) {
      switch (frameOptions.constructor) {
        case Array:
          {
            return frameOptions.map(this.getAnimationName).join(', ');
          }

        case String:
          {
            return frameOptions.split(' ')[0];
          }

        default:
          {
            return frameOptions.name;
          }
      }
    }
  }], [{
    key: "isSupported",
    value: function isSupported() {
      return document.body.style.animationName !== undefined;
    }
  }, {
    key: "playCSS",
    value: function playCSS(frameOptions) {
      var animObjToStr = function animObjToStr(obj) {
        var newObj = (0, _objectSpread2.default)({
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
          frameOptionsStrings.push(frameOptions[i].constructor === String ? frameOptions[i] : animObjToStr(frameOptions[i]));
        }

        return frameOptionsStrings.join(', ');
      }

      if (frameOptions.constructor === String) {
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
          var cssRuleObject = objToCss(frameData[key]);
          css += "".concat(key, " {").concat(cssRuleObject, "}");
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
      var oldFrameIndex = this.rules.indexOf(frameData.name);

      if (oldFrameIndex > -1) {
        this.sheet.deleteRule(oldFrameIndex);
        delete this.rules[oldFrameIndex];
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
          pluginFunc[i](this);
        }
      } else {
        pluginFunc(this);
      }
    }
  }]);
  return Keyframes;
}();

if (typeof window !== 'undefined') {
  var style = document.createElement('style');
  style.setAttribute('id', 'keyframesjs-stylesheet');
  document.head.appendChild(style);
  Keyframes.sheet = style.sheet;
  Keyframes.rules = [];
  window.Keyframes = Keyframes;
}

var _default = Keyframes;
exports.default = _default;
