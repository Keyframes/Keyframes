import Keyframes from '../src/keyframes';

const ball = new Keyframes(document.getElementById('ball'));

// Adding a new animation sequences (keyframe)
Keyframes.define([{
    name: 'ball-move',
    '0%': {
        'margin-left': '0px',
    },
    '50%': {
        'margin-left': '600px',
    },
    '100%': {
        'margin-left': '0px',
    },
}, {
    name: 'ball-spin',
    from: {
        transform: 'rotate(90deg)',
    },
    to: {
        transform: 'rotate(450deg)',
    },
}]);

window.pause = () => {
    // freeze keyframe animation and kill callback
    ball.pause();
};

window.resume = () => {
    // resume keyframe animation
    ball.resume();
};

window.reset = () => {
    // reset keyframe animation
    ball.reset();
};

// example callback function
const cbElem = document.getElementById('cb');
function increment() {
    cbElem.innerHTML = parseInt(cbElem.innerHTML, 10) + 1;
}


window.play = (animation) => {
    ball.reset(() => {
        switch (animation) {
        case 'normal':

        // move with easing
            ball.play({
                name: 'ball-move',
                duration: '3s',
                timingFunction: 'ease',
                iterationCount: 'infinite',
                direction: 'normal',
                fillMode: 'forwards',
                complete: increment,
            });

            break;
        case 'spin':

        // run spin keyframes using the shorthand method.
            ball.play('ball-spin 500ms linear 0s 3 normal forwards', increment);

            break;
        case 'linear':

        // move with linear timing
            ball.play({
                name: 'ball-move',
                duration: '3s',
                timingFunction: 'linear',
                iterationCount: 'infinite',
                complete: increment,
            });

            break;
        case 'delay':

        // set a 2 second delay before starting
            ball.play({
                name: 'ball-move',
                duration: '3s',
                timingFunction: 'linear',
                delay: '3s',
                iterationCount: 'infinite',
                complete: increment,
            });

            break;
        case 'once':

        // only play the animation once
            ball.play({
                name: 'ball-move',
                duration: '3s',
                timingFunction: 'ease',
                complete: increment,
            });

            break;
        case 'multi':
        // play multiple animations
            ball.play(
                [
                    'ball-spin 500ms linear 0s 6',
                    {
                        name: 'ball-move',
                        duration: '3s',
                        timingFunction: 'ease',
                        iterationCount: 1,
                    },
                ],
                increment,
            );
            break;
        default:

        case 'chained':
        // play chained animations using callbacks
            ball.play({
                name: 'ball-spin',
                duration: "1s",
                iterationCount: 1
              }, () => {
                increment();
                setTimeout(() => ball.play({
                    name: 'ball-move',
                    duration: "1s",
                    iterationCount: 1
                  }, () => {
                    ball.reset();
                    increment();
                }), 1000);
            });
        }
    });
};
