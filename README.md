# Keyframes

![](https://badge.fury.io/js/%40keyframes%2Fcore.svg)

Keyframes allows dynamic generation of CSS keyframes with callback events and other niceness.

## Overview

CSS3 introduced fancy features like transformations, translations, rotations and scaling.
Keyframes allows you to manage and execute animations using Javascript.

## Installation

Install from npm:
```
npm install @keyframes/core --save
```

Import into your project using the following line:
```javascript
import Keyframes from '@keyframes/core';
```

Be sure to define and play animations after the page has loaded by including your script tag at the bottom of the document or using `window.onload`.

## Usage

**Detecting CSS animation support**

```javascript
var supportedFlag = Keyframes.isSupported();
```

## Defining

Defining keyframes happens before any any animation logic takes place. The CSS is stored and indexed in a single style tag in the header with the id `keyframesjs-stylesheet`.

**Adding a new animation sequence (keyframe)**

```javascript
Keyframes.define([{
    name: 'trapdoor-sequence',
    '0%': {height: 70},
    '30%': {height: 10},
    '60%': {height: 30},
    '100%': {height: 10}
}]);
```

**Adding a single frame style**

```javascript
Keyframes.define({
    name: 'ball-roll',
    from: {
        transform: 'rotate(0deg)'
    },
    to: {
        transform: 'rotate(360deg)'
    }
});
```

**Adding multiple frame styles**

```javascript
Keyframes.define([{
	name: 'roll-clockwise',
	'0%': {
	    marginLeft: 0,
	    backgroundColor: 'red',
	    transform: 'rotate(0deg)'
	},
	'100%': {
	    marginLeft: 600,
	    transform: 'rotate(360deg)'
	}
    },{
	name: 'roll-anti-clockwise',
	'0%': {
	    marginLeft: 0,
	    backgroundColor: 'red',
	    transform: 'rotate(0deg)'
	},
	'100%': {
	    marginLeft: 600,
	    transform: 'rotate(-360deg)'
	}
    }
]);
```

**Adding styles and properties in array fashion**

*Gives resemblance to CSS styling definitions*

```javascript
var shake_start = {transform: 'translate(0px)'};
var shake_odd1 = {transform: 'translate(-10px, -10px)'};
var shake_even1 = {transform: 'translate(10px, 10px)'};
var shake_odd2 = {transform: 'translate(10px, -10px)'};
var shake_even2 = {transform: 'translate(-10px, 10px)'};

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
        marginLeft: 0
    },
    to: {
        marginLeft: 600
    }
    }
]);
```

## Playing

After the keyframes have been defined (see above), they can now be used on any element in the dom.
First we must create an instance of Keyframejs using our chosen element.

```javascript
const ball = new Keyframes(document.getElementById('ball'));
```

The css3 animation methods available are better documented here: http://www.w3schools.com/css/css3_animations.asp

```javascript
ball.play({
    name: 'trapdoor-sequence', // [required] name of the keyframe you want to bind to the selected element
    duration: '1s', // [optional, default: '0s'] how long you want it to last in milliseconds
    timingFunction: 'linear', // [optional, default: 'ease'] specifies the speed curve of the animation
    delay: '0s', //[optional, default: '0s']  how long you want to wait before the animation starts
    iterationCount: 'infinite', //[optional, default: 1]  how many times you want the animation to repeat
    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
}, 
{ // Callbacks
    onBeforeStart, // Optional: Fired before the animation starts.
    onStart, // Optional: Fired after the animation started.
    onIteration, // Optional: If your animation has multiple iterations, this function will fire after each one.
    onEnd, // Optional: Fired at the end of the animation but if using a `queue`, it will fire after the queue has completed.
});
```

**Playing an animation (shorthand)**

```javascript
ball.play(
    'trapdoor-sequence 1s linear 0s infinite normal forwards',
    callbacks
);
```

**Playing multiple animations simultaneously (at the same time)**

```javascript
ball.play([
    'trapdoor-sequence 1s linear 0s infinite',
    {
      name: 'ball-roll',
      duration: "3s",
      timingFunction: 'ease',
      iterationCount: 1
    }
], callbacks);
```

**Playing multiple animations sequentially on a loop**
```javascript
ball.loop([
    'trapdoor-sequence 1s',
    ['crazy 2s', 'crazy-alt 2s'], // These animations are played simultaneously.
], callbacks);
```

**Use a queue which can be added to whenever**
If the queue was previously empty, the queue will start executing immediately.
```javascript
ball.queue('trapdoor-sequence 1s', callbacks) // Setting callbacks overrides previous callbacks so you only need to set it on the first call.
    .queue('crazy 3s'); // Run crazy after the trapdoor-sequence is complete.
setTimeout(() => ball.queue('crazy 3s'), 1000); // Add crazy to the queue again, so it will be run twice.
```

**Reset the animation**
Resets styling, animations and removes callbacks.
```javascript
ball.reset().then(doSomething);
```

**Reset the queue**
Resets styling, animations, removes callbacks and clears the queue.
```javascript
ball.resetQueue().then(doSomething);
```

**Pause keyframe animation**

```javascript
ball.pause();
```

**Resume keyframe animation**

```javascript
ball.resume();
```

## Want more control?

Handy functions to let you handle the styling yourself...

**Generate the defined keyframes css**

```javascript
let css = Keyframes.defineCSS({
    name: 'ball-spin',
    from: {
        transform: 'rotate(90deg)',
    },
    to: {
        transform: 'rotate(450deg)',
    },
}); // "@keyframes ball-spin {from {transform:rotate(90deg);}to {transform:rotate(450deg);}"
```

**Generate the "animation" rule's value (play)**

```javascript
const css = Keyframes.playCSS({
    name: 'ball-spin',
    duration: '1s',
    iterationCount: 1
}); // "ball-spin 1s ease 0s 1 normal forwards"
```

## Plugins!

Installing a plugin is simple...
```javascript
import Pathfinder from '@keyframes/pathfinder';
Keyframes.plugin(Pathfinder); // You can also pass an array of plugins for convenience.
```

See other plugins that allow for spritesheets & more complex movement paths: https://github.com/Keyframes

Changelog
---------

**2.0.6**
* Deprecate chain
* Fixed a bug where queue would not actually queue animations

**2.0.5**
* Added `loop` method
* Bug fixes
* Added freeze and unfreeze

**2.0.0**
* https://github.com/Keyframes/Keyframes/issues/1 Queue
* https://github.com/Keyframes/Keyframes/issues/9 Js Style keys

**1.1.1**
* Reset now uses `requestAnimationFrame` instead of timeouts.
* Allow an array of plugins to be added
* Code reduction.

**1.1.0**
* Use `insertRule` to add keyframes to a single style tag in the header.

**1.0.7**
* Add playCSS and defineCSS generation functions

**1.0.3**
* Make it a module
* Add plugin function

**1.0.0**
* Vanilla project initiated
