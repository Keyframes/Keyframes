Keyframes
===========

![](https://badge.fury.io/gh/Keyframes/Keyframes.svg)

Keyframes allows dynamic generation of CSS keyframes with callback events and other niceness.

Overview
--------
CSS3 introduced fancy features like transformations, translations, rotations and scaling.
Keyframes allows you to manage and execute animations using Javascript.

Installation
------------

Install from npm:
```
npm install @keyframes/core --save
```

Import into your project using the following line:
```javascript
import Keyframes from '@keyframes/core';
```

Be sure to define and play animations after the page has loaded by including your script tag at the bottom of the document or using `window.onload`.

Usage
-------------

**Detecting CSS animation support**

```javascript
var supportedFlag = Keyframes.isSupported();
```

**Adding a new animation sequence (keyframe)**

```javascript
Keyframes.define([{
    name: 'trapdoor-sequence',
    '0%': {'height': '70px'},
    '30%': {'height': '10px'},
    '60%': {'height': '30px'},
    '100%': {'height': '10px'}
}]);
```

**Adding a single frame style**

```javascript
Keyframes.define({
    name: 'ball-roll',
    from: {
        'transform': 'rotate(0deg)' //Note that 'transform' will be autoprefixed for you
    },
    to: {
        'transform': 'rotate(360deg)' //Note that 'transform' will be autoprefixed for you
    }
});
```

**Adding multiple frame styles**

```javascript
Keyframes.define([{
	name: 'roll-clockwise',
	'0%': {
	    'margin-left' : '0px',
	    'background-color' : 'red',
	    'transform' : 'rotate(0deg)'
	},
	'100%': {
	    'margin-left' : '600px',
	    'transform' : 'rotate(360deg)'
	}
    },{
	name: 'roll-anti-clockwise',
	'0%': {
	    'margin-left' : '0px',
	    'background-color' : 'red',
	    'transform' : 'rotate(0deg)'
	},
	'100%': {
	    'margin-left' : '600px',
	    'transform' : 'rotate(-360deg)'
	}
    }
]);
```

**Adding styles and properties in array fashion**

*Gives resemblance to CSS styling definitions*

```javascript
var shake_start = {'transform': 'translate(0px)'};
var shake_odd1 = {'transform': 'translate(-10px, -10px)'};
var shake_even1 = {'transform': 'translate(10px, 10px)'};
var shake_odd2 = {'transform': 'translate(10px, -10px)'};
var shake_even2 = {'transform': 'translate(-10px, 10px)'};

Keyframes.define([{
	name: 'crazy',
	'0%': shake_start,
	'10%': shake_odd2,
	'20%': shake_even1,
	'30%': shake_odd2,
	'40%': shake_even2,
	'50%': shake_odd2,
	'60%': shake_even1,
	'70%': shake_odd1,
	'80%': shake_even2,
	'90%': shake_odd1
    }
]);
```

*Please note, you can add as many properties to the array as you want to*

**Responsive animations**
```javascript
Keyframes.define([{
    name: 'roll-clockwise',
    media: 'screen and (max-width: 700px)',
    from: {
        'margin-left' : '0px'
    },
    to: {
        'margin-left' : '600px'
    }
    }
]);
```

**Playing an animation**

First we must create an instance of a keyframe.

```javascript
const ball = new Keyframes(document.getElementById('ball'));
```

The css3 animation methods available are better documented here: http://www.w3schools.com/css/css3_animations.asp

```javascript
ball.play({
    name: 'trapdoor-sequence', // name of the keyframe you want to bind to the selected element
    duration: '1s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
    timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
    delay: '0s', //[optional, default: 0s]  how long you want to wait before the animation starts
    iterationCount: 'infinite', //[optional, default:1]  how many times you want the animation to repeat
    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
    complete: function(){} //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
});
```

**Playing an animation (shorthand)**

```javascript
ball.play(
    'trapdoor-sequence 1s linear 0s infinite normal forwards',
    complete
);
```

**Playing multiple animations**

```javascript
ball.play([
    'trapdoor-sequence 1s linear 0s infinite',
    {
      name: 'ball-roll',
      duration: "3s",
      timingFunction: 'ease',
      iterationCount: 1
    }
], complete);
```

**Reset the animation**

```javascript
ball.reset(callback);
```

**Freeze keyframe animation and kill callbacks**

```javascript
ball.pause();
```

**Resume keyframe animation**

```javascript
ball.resume();
```

Plugins!
--------

Installing a plugin is simple...
```javascript
import Pathfinder from '@keyframes/pathfinder';
Keyframes.plugin(Pathfinder);
```

See other plugins that allow for spritesheets & more complex movement paths: https://github.com/Keyframes

Changelog
---------
**1.0.3**
* Make it a module
* Add plugin function
**1.0.0**
* Vanilla project initiated