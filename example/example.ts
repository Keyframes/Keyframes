import Keyframes, { KeyframeObject, KeyframeAnimationObject, KeyframeAnimationOptionArray } from '../src/keyframes';

const ball = new Keyframes(document.getElementById('ball') as HTMLElement);

// example callback function
const cbElem = document.getElementById('cb') as HTMLElement;

// Adding a new animation sequences (keyframe)
Keyframes.define([{
    name: 'ball-move',
    '0%': {
        marginLeft: '0',
    },
    '50%': {
        marginLeft: '600px',
    },
    '100%': {
        marginLeft: '0',
    },
}, {
    name: 'ball-spin',
    from: {
        transform: 'rotate(90deg)',
    },
    to: {
        transform: 'rotate(450deg)',
    },
}] as KeyframeObject[]);

(window as any).pause = () => {
    // freeze keyframe animation and kill callback
    ball.pause();
};

(window as any).resume = () => {
    // resume keyframe animation
    ball.resume();
};

(window as any).reset = () => {
    // reset keyframe animation
    cbElem.innerHTML = '0';
    ball.reset();
    cbElem.innerHTML = '0';
};

// example callback function
function increment() {
    if (cbElem) {
        cbElem.innerHTML = `${parseInt(cbElem.innerHTML, 10) + 1}`;
    }
}

(window as any).play = (animation: string) => {
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
            } as KeyframeAnimationObject, {
                onIteration: increment,
                onEnd: increment,
            });

            break;
        case 'spin':

            // run spin keyframes using the shorthand method.
            ball.play('ball-spin 500ms linear 0s 3 normal forwards', {
                onIteration: increment,
                onEnd: increment,
            });

            break;
        case 'linear':

            // move with linear timing
            ball.play({
                name: 'ball-move',
                duration: '3s',
                timingFunction: 'linear',
                iterationCount: 'infinite',
            } as KeyframeAnimationObject, {
                onIteration: increment,
                onEnd: increment,
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
            } as KeyframeAnimationObject, {
                onIteration: increment,
                onEnd: increment,
            });

            break;
        case 'once':

            // only play the animation once
            ball.play({
                name: 'ball-move',
                duration: '3s',
                timingFunction: 'ease',
            } as KeyframeAnimationObject, {
                onIteration: increment,
                onEnd: increment,
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
                ] as KeyframeAnimationOptionArray,
                {
                    onIteration: increment,
                },
            );
            break;
        default:

        case 'chained':
        // play chained animations using callbacks
            ball.chain([{
                name: 'ball-spin',
                duration: '1s',
                iterationCount: 1,
            }, {
                name: 'ball-move',
                duration: '1s',
                iterationCount: 1,
            }] as KeyframeAnimationOptionArray, {
                onEnd: increment,
            });
            break;
    }
};
