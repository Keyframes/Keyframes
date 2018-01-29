(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var cbElem = document.getElementById('cb');

function increment() {
  cbElem.innerHTML = parseInt(cbElem.innerHTML) + 1;
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
    }
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUuZXM2LmpzIl0sIm5hbWVzIjpbIl9rZXlmcmFtZXMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIm9iaiIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiYmFsbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkZWZpbmUiLCJuYW1lIiwiZnJvbSIsInRyYW5zZm9ybSIsInRvIiwid2luZG93IiwicGF1c2UiLCJyZXN1bWUiLCJjYkVsZW0iLCJpbmNyZW1lbnQiLCJpbm5lckhUTUwiLCJwYXJzZUludCIsInBsYXkiLCJhbmltYXRpb24iLCJyZXNldCIsImR1cmF0aW9uIiwidGltaW5nRnVuY3Rpb24iLCJpdGVyYXRpb25Db3VudCIsImRpcmVjdGlvbiIsImZpbGxNb2RlIiwiY29tcGxldGUiLCJkZWxheSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsSUFBSUEsYUFBYUMsdUJBQXVCQyxRQUFRLGtCQUFSLENBQXZCLENBQWpCOztBQUVBLFNBQVNELHNCQUFULENBQWdDRSxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLE9BQU9BLElBQUlDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQUVFLGFBQVNGO0FBQVgsR0FBckM7QUFBd0Q7O0FBRS9GLElBQUlHLE9BQU8sSUFBSU4sV0FBV0ssT0FBZixDQUF1QkUsU0FBU0MsY0FBVCxDQUF3QixNQUF4QixDQUF2QixDQUFYOztBQUVBUixXQUFXSyxPQUFYLENBQW1CSSxNQUFuQixDQUEwQixDQUFDO0FBQ3pCQyxRQUFNLFdBRG1CO0FBRXpCLFFBQU07QUFDSixtQkFBZTtBQURYLEdBRm1CO0FBS3pCLFNBQU87QUFDTCxtQkFBZTtBQURWLEdBTGtCO0FBUXpCLFVBQVE7QUFDTixtQkFBZTtBQURUO0FBUmlCLENBQUQsRUFXdkI7QUFDREEsUUFBTSxXQURMO0FBRURDLFFBQU07QUFDSkMsZUFBVztBQURQLEdBRkw7QUFLREMsTUFBSTtBQUNGRCxlQUFXO0FBRFQ7QUFMSCxDQVh1QixDQUExQjs7QUFxQkFFLE9BQU9DLEtBQVAsR0FBZSxZQUFZO0FBQ3pCVCxPQUFLUyxLQUFMO0FBQ0QsQ0FGRDs7QUFJQUQsT0FBT0UsTUFBUCxHQUFnQixZQUFZO0FBQzFCVixPQUFLVSxNQUFMO0FBQ0QsQ0FGRDs7QUFJQSxJQUFJQyxTQUFTVixTQUFTQyxjQUFULENBQXdCLElBQXhCLENBQWI7O0FBRUEsU0FBU1UsU0FBVCxHQUFxQjtBQUNuQkQsU0FBT0UsU0FBUCxHQUFtQkMsU0FBU0gsT0FBT0UsU0FBaEIsSUFBNkIsQ0FBaEQ7QUFDRDs7QUFFREwsT0FBT08sSUFBUCxHQUFjLFVBQVVDLFNBQVYsRUFBcUI7QUFDakNoQixPQUFLaUIsS0FBTCxDQUFXLFlBQVk7QUFDckIsWUFBUUQsU0FBUjtBQUNFLFdBQUssUUFBTDtBQUNFaEIsYUFBS2UsSUFBTCxDQUFVO0FBQ1JYLGdCQUFNLFdBREU7QUFFUmMsb0JBQVUsSUFGRjtBQUdSQywwQkFBZ0IsTUFIUjtBQUlSQywwQkFBZ0IsVUFKUjtBQUtSQyxxQkFBVyxRQUxIO0FBTVJDLG9CQUFVLFVBTkY7QUFPUkMsb0JBQVVYO0FBUEYsU0FBVjtBQVNBOztBQUVGLFdBQUssTUFBTDtBQUNFWixhQUFLZSxJQUFMLENBQVUsNkNBQVYsRUFBeURILFNBQXpEO0FBQ0E7O0FBRUYsV0FBSyxRQUFMO0FBQ0VaLGFBQUtlLElBQUwsQ0FBVTtBQUNSWCxnQkFBTSxXQURFO0FBRVJjLG9CQUFVLElBRkY7QUFHUkMsMEJBQWdCLFFBSFI7QUFJUkMsMEJBQWdCLFVBSlI7QUFLUkcsb0JBQVVYO0FBTEYsU0FBVjtBQU9BOztBQUVGLFdBQUssT0FBTDtBQUNFWixhQUFLZSxJQUFMLENBQVU7QUFDUlgsZ0JBQU0sV0FERTtBQUVSYyxvQkFBVSxJQUZGO0FBR1JDLDBCQUFnQixRQUhSO0FBSVJLLGlCQUFPLElBSkM7QUFLUkosMEJBQWdCLFVBTFI7QUFNUkcsb0JBQVVYO0FBTkYsU0FBVjtBQVFBOztBQUVGLFdBQUssTUFBTDtBQUNFWixhQUFLZSxJQUFMLENBQVU7QUFDUlgsZ0JBQU0sV0FERTtBQUVSYyxvQkFBVSxJQUZGO0FBR1JDLDBCQUFnQixNQUhSO0FBSVJJLG9CQUFVWDtBQUpGLFNBQVY7QUFNQTs7QUFFRixXQUFLLE9BQUw7QUFDRVosYUFBS2UsSUFBTCxDQUFVLENBQUMsNkJBQUQsRUFBZ0M7QUFDeENYLGdCQUFNLFdBRGtDO0FBRXhDYyxvQkFBVSxJQUY4QjtBQUd4Q0MsMEJBQWdCLE1BSHdCO0FBSXhDQywwQkFBZ0I7QUFKd0IsU0FBaEMsQ0FBVixFQUtJUixTQUxKO0FBTUE7O0FBRUY7QUF4REY7QUEwREQsR0EzREQ7QUE0REQsQ0E3REQiLCJmaWxlIjoiL1VzZXJzL2pha2VjYXR0cmFsbC9HaXRIdWIvS2V5ZnJhbWVzL2V4YW1wbGUvZXhhbXBsZS5lczYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9rZXlmcmFtZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9zcmMva2V5ZnJhbWVzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGJhbGwgPSBuZXcgX2tleWZyYW1lcy5kZWZhdWx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWxsJykpO1xuXG5fa2V5ZnJhbWVzLmRlZmF1bHQuZGVmaW5lKFt7XG4gIG5hbWU6ICdiYWxsLW1vdmUnLFxuICAnMCUnOiB7XG4gICAgJ21hcmdpbi1sZWZ0JzogJzBweCdcbiAgfSxcbiAgJzUwJSc6IHtcbiAgICAnbWFyZ2luLWxlZnQnOiAnNjAwcHgnXG4gIH0sXG4gICcxMDAlJzoge1xuICAgICdtYXJnaW4tbGVmdCc6ICcwcHgnXG4gIH1cbn0sIHtcbiAgbmFtZTogJ2JhbGwtc3BpbicsXG4gIGZyb206IHtcbiAgICB0cmFuc2Zvcm06ICdyb3RhdGUoOTBkZWcpJ1xuICB9LFxuICB0bzoge1xuICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg0NTBkZWcpJ1xuICB9XG59XSk7XG5cbndpbmRvdy5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgYmFsbC5wYXVzZSgpO1xufTtcblxud2luZG93LnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcbiAgYmFsbC5yZXN1bWUoKTtcbn07XG5cbnZhciBjYkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2InKTtcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBjYkVsZW0uaW5uZXJIVE1MID0gcGFyc2VJbnQoY2JFbGVtLmlubmVySFRNTCkgKyAxO1xufVxuXG53aW5kb3cucGxheSA9IGZ1bmN0aW9uIChhbmltYXRpb24pIHtcbiAgYmFsbC5yZXNldChmdW5jdGlvbiAoKSB7XG4gICAgc3dpdGNoIChhbmltYXRpb24pIHtcbiAgICAgIGNhc2UgJ25vcm1hbCc6XG4gICAgICAgIGJhbGwucGxheSh7XG4gICAgICAgICAgbmFtZTogJ2JhbGwtbW92ZScsXG4gICAgICAgICAgZHVyYXRpb246ICczcycsXG4gICAgICAgICAgdGltaW5nRnVuY3Rpb246ICdlYXNlJyxcbiAgICAgICAgICBpdGVyYXRpb25Db3VudDogJ2luZmluaXRlJyxcbiAgICAgICAgICBkaXJlY3Rpb246ICdub3JtYWwnLFxuICAgICAgICAgIGZpbGxNb2RlOiAnZm9yd2FyZHMnLFxuICAgICAgICAgIGNvbXBsZXRlOiBpbmNyZW1lbnRcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdzcGluJzpcbiAgICAgICAgYmFsbC5wbGF5KCdiYWxsLXNwaW4gNTAwbXMgbGluZWFyIDBzIDMgbm9ybWFsIGZvcndhcmRzJywgaW5jcmVtZW50KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2xpbmVhcic6XG4gICAgICAgIGJhbGwucGxheSh7XG4gICAgICAgICAgbmFtZTogJ2JhbGwtbW92ZScsXG4gICAgICAgICAgZHVyYXRpb246ICczcycsXG4gICAgICAgICAgdGltaW5nRnVuY3Rpb246ICdsaW5lYXInLFxuICAgICAgICAgIGl0ZXJhdGlvbkNvdW50OiAnaW5maW5pdGUnLFxuICAgICAgICAgIGNvbXBsZXRlOiBpbmNyZW1lbnRcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdkZWxheSc6XG4gICAgICAgIGJhbGwucGxheSh7XG4gICAgICAgICAgbmFtZTogJ2JhbGwtbW92ZScsXG4gICAgICAgICAgZHVyYXRpb246ICczcycsXG4gICAgICAgICAgdGltaW5nRnVuY3Rpb246ICdsaW5lYXInLFxuICAgICAgICAgIGRlbGF5OiAnM3MnLFxuICAgICAgICAgIGl0ZXJhdGlvbkNvdW50OiAnaW5maW5pdGUnLFxuICAgICAgICAgIGNvbXBsZXRlOiBpbmNyZW1lbnRcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdvbmNlJzpcbiAgICAgICAgYmFsbC5wbGF5KHtcbiAgICAgICAgICBuYW1lOiAnYmFsbC1tb3ZlJyxcbiAgICAgICAgICBkdXJhdGlvbjogJzNzJyxcbiAgICAgICAgICB0aW1pbmdGdW5jdGlvbjogJ2Vhc2UnLFxuICAgICAgICAgIGNvbXBsZXRlOiBpbmNyZW1lbnRcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdtdWx0aSc6XG4gICAgICAgIGJhbGwucGxheShbJ2JhbGwtc3BpbiA1MDBtcyBsaW5lYXIgMHMgNicsIHtcbiAgICAgICAgICBuYW1lOiAnYmFsbC1tb3ZlJyxcbiAgICAgICAgICBkdXJhdGlvbjogJzNzJyxcbiAgICAgICAgICB0aW1pbmdGdW5jdGlvbjogJ2Vhc2UnLFxuICAgICAgICAgIGl0ZXJhdGlvbkNvdW50OiAxXG4gICAgICAgIH1dLCBpbmNyZW1lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH0pO1xufTtcbiJdfQ==
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
    }
  }], [{
    key: "createKeyframeTag",
    value: function createKeyframeTag(id, css) {
      var elem = document.createElement('style');
      elem.innerHTML = css;
      elem.setAttribute('class', 'keyframe-style');
      elem.setAttribute('id', id);
      elem.setAttribute('type', 'text/css');
      document.getElementsByTagName('head')[0].appendChild(elem);
    }
  }, {
    key: "generate",
    value: function generate(frameData) {
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

      if (frameData.media) {
        css = "@media ".concat(frameData.media, "{").concat(css, "}");
      }

      var frameStyle = document.getElementById(frameName);

      if (frameStyle) {
        frameStyle.innerHTML = css;
      } else {
        Keyframes.createKeyframeTag(frameName, css);
      }
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
    key: "plugin",
    value: function plugin(pluginFunc) {
      pluginFunc();
    }
  }]);

  return Keyframes;
}();

exports.default = Keyframes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleWZyYW1lcy5qcyJdLCJuYW1lcyI6WyJLZXlmcmFtZXMiLCJlbGVtIiwiZG9jdW1lbnQiLCJib2R5Iiwic3R5bGUiLCJhbmltYXRpb25OYW1lIiwidW5kZWZpbmVkIiwiY2FsbGJhY2siLCJhbmltYXRpb25QbGF5U3RhdGUiLCJhbmltYXRpb24iLCJzZXRUaW1lb3V0IiwiZnJhbWVPcHRpb25zIiwiYW5pbU9ialRvU3RyIiwib2JqIiwibmV3T2JqIiwiT2JqZWN0IiwiYXNzaWduIiwiZHVyYXRpb24iLCJ0aW1pbmdGdW5jdGlvbiIsImRlbGF5IiwiaXRlcmF0aW9uQ291bnQiLCJkaXJlY3Rpb24iLCJmaWxsTW9kZSIsIm5hbWUiLCJqb2luIiwiYW5pbWF0aW9uY3NzIiwiY29uc3RydWN0b3IiLCJBcnJheSIsImZyYW1lT3B0aW9uc1N0cmluZ3MiLCJpIiwibGVuZ3RoIiwicHVzaCIsImFkZEV2ZW50IiwidHlwZSIsImV2ZW50Q2FsbGJhY2siLCJsaXN0ZW5lck5hbWUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBsZXRlIiwiaWQiLCJjc3MiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhcHBlbmRDaGlsZCIsImZyYW1lRGF0YSIsImZyYW1lTmFtZSIsImtleSIsInByb3BlcnR5IiwibWVkaWEiLCJmcmFtZVN0eWxlIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVLZXlmcmFtZVRhZyIsImdlbmVyYXRlIiwicGx1Z2luRnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFxQkEsUzs7O0FBQ2pCLHFCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2QsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0g7Ozs7a0NBRWE7QUFDVixhQUFPQyxTQUFTQyxJQUFULENBQWNDLEtBQWQsQ0FBb0JDLGFBQXBCLEtBQXNDQyxTQUE3QztBQUNIOzs7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OUIsRUFBc0NELEtBQUssQ0FBM0MsRUFBOEM7QUFDMUMsZUFBS3lCLFFBQUwsQ0FBY1IsVUFBVWpCLENBQVYsQ0FBZDtBQUNIO0FBQ0osT0FKRCxNQUlPO0FBQ0gsYUFBS3lCLFFBQUwsQ0FBY1IsU0FBZDtBQUNIO0FBQ0o7OzsyQkFFYVMsVSxFQUFZO0FBQ3RCQTtBQUNIIiwiZmlsZSI6Ii9Vc2Vycy9qYWtlY2F0dHJhbGwvR2l0SHViL0tleWZyYW1lcy9zcmMva2V5ZnJhbWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5ZnJhbWVzIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IGVsZW07XG4gICAgfVxuXG4gICAgaXNTdXBwb3J0ZWQoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5LnN0eWxlLmFuaW1hdGlvbk5hbWUgIT09IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXNldChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmVsZW0uc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3J1bm5pbmcnO1xuICAgICAgICB0aGlzLmVsZW0uc3R5bGUuYW5pbWF0aW9uID0gJ25vbmUnO1xuXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgdGhpcy5lbGVtLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdwYXVzZWQnO1xuICAgIH1cblxuICAgIHJlc3VtZSgpIHtcbiAgICAgICAgdGhpcy5lbGVtLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdydW5uaW5nJztcbiAgICB9XG5cbiAgICBwbGF5KGZyYW1lT3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgYW5pbU9ialRvU3RyID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgY29uc3QgbmV3T2JqID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAnMHMnLFxuICAgICAgICAgICAgICAgIHRpbWluZ0Z1bmN0aW9uOiAnZWFzZScsXG4gICAgICAgICAgICAgICAgZGVsYXk6ICcwcycsXG4gICAgICAgICAgICAgICAgaXRlcmF0aW9uQ291bnQ6IDEsXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICBmaWxsTW9kZTogJ2ZvcndhcmRzJyxcbiAgICAgICAgICAgIH0sIG9iaik7XG5cbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgbmV3T2JqLm5hbWUsXG4gICAgICAgICAgICAgICAgbmV3T2JqLmR1cmF0aW9uLFxuICAgICAgICAgICAgICAgIG5ld09iai50aW1pbmdGdW5jdGlvbixcbiAgICAgICAgICAgICAgICBuZXdPYmouZGVsYXksXG4gICAgICAgICAgICAgICAgbmV3T2JqLml0ZXJhdGlvbkNvdW50LFxuICAgICAgICAgICAgICAgIG5ld09iai5kaXJlY3Rpb24sXG4gICAgICAgICAgICAgICAgbmV3T2JqLmZpbGxNb2RlLFxuICAgICAgICAgICAgXS5qb2luKCcgJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGFuaW1hdGlvbmNzcyA9ICcnO1xuXG4gICAgICAgIGlmIChmcmFtZU9wdGlvbnMuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XG4gICAgICAgICAgICBjb25zdCBmcmFtZU9wdGlvbnNTdHJpbmdzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lT3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGZyYW1lT3B0aW9uc1N0cmluZ3MucHVzaCh0eXBlb2YgZnJhbWVPcHRpb25zW2ldID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lT3B0aW9uc1tpXSA6XG4gICAgICAgICAgICAgICAgICAgIGFuaW1PYmpUb1N0cihmcmFtZU9wdGlvbnNbaV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFuaW1hdGlvbmNzcyA9IGZyYW1lT3B0aW9uc1N0cmluZ3Muam9pbignLCAnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZnJhbWVPcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgYW5pbWF0aW9uY3NzID0gZnJhbWVPcHRpb25zO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5pbWF0aW9uY3NzID0gYW5pbU9ialRvU3RyKGZyYW1lT3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhZGRFdmVudCA9ICh0eXBlLCBldmVudENhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lck5hbWUgPSBgJHt0eXBlfUxpc3RlbmVyYDtcbiAgICAgICAgICAgIHRoaXMuZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIHRoaXNbbGlzdGVuZXJOYW1lXSk7XG4gICAgICAgICAgICB0aGlzW2xpc3RlbmVyTmFtZV0gPSBldmVudENhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5lbGVtLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpc1tsaXN0ZW5lck5hbWVdKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmVsZW0uc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3J1bm5pbmcnO1xuICAgICAgICB0aGlzLmVsZW0uc3R5bGUuYW5pbWF0aW9uID0gYW5pbWF0aW9uY3NzO1xuICAgICAgICB0aGlzLmZyYW1lT3B0aW9ucyA9IGZyYW1lT3B0aW9ucztcblxuICAgICAgICBhZGRFdmVudCgnYW5pbWF0aW9uaXRlcmF0aW9uJywgY2FsbGJhY2sgfHwgZnJhbWVPcHRpb25zLmNvbXBsZXRlKTtcbiAgICAgICAgYWRkRXZlbnQoJ2FuaW1hdGlvbmVuZCcsIGNhbGxiYWNrIHx8IGZyYW1lT3B0aW9ucy5jb21wbGV0ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUtleWZyYW1lVGFnKGlkLCBjc3MpIHtcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIGVsZW0uaW5uZXJIVE1MID0gY3NzO1xuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAna2V5ZnJhbWUtc3R5bGUnKTtcbiAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGVsZW0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZW5lcmF0ZShmcmFtZURhdGEpIHtcbiAgICAgICAgY29uc3QgZnJhbWVOYW1lID0gZnJhbWVEYXRhLm5hbWUgfHwgJyc7XG4gICAgICAgIGxldCBjc3MgPSBgQGtleWZyYW1lcyAke2ZyYW1lTmFtZX0ge2A7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGZyYW1lRGF0YSkge1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gJ25hbWUnICYmIGtleSAhPT0gJ21lZGlhJyAmJiBrZXkgIT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgICAgICBjc3MgKz0gYCR7a2V5fSB7YDtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZnJhbWVEYXRhW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY3NzICs9IGAke3Byb3BlcnR5fToke2ZyYW1lRGF0YVtrZXldW3Byb3BlcnR5XX07YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjc3MgKz0gJ30nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyYW1lRGF0YS5tZWRpYSkge1xuICAgICAgICAgICAgY3NzID0gYEBtZWRpYSAke2ZyYW1lRGF0YS5tZWRpYX17JHtjc3N9fWA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmcmFtZVN0eWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZnJhbWVOYW1lKTtcblxuICAgICAgICBpZiAoZnJhbWVTdHlsZSkge1xuICAgICAgICAgICAgZnJhbWVTdHlsZS5pbm5lckhUTUwgPSBjc3M7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBLZXlmcmFtZXMuY3JlYXRlS2V5ZnJhbWVUYWcoZnJhbWVOYW1lLCBjc3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmluZShmcmFtZURhdGEpIHtcbiAgICAgICAgaWYgKGZyYW1lRGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhbWVEYXRhLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZShmcmFtZURhdGFbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZShmcmFtZURhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHBsdWdpbihwbHVnaW5GdW5jKSB7XG4gICAgICAgIHBsdWdpbkZ1bmMoKTtcbiAgICB9XG59XG4iXX0=
},{}]},{},[1]);
