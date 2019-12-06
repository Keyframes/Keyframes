import Keyframes, { bezierPath, circlePath, spriteSheet, playSpriteSheet } from '../src/keyframes';

const ball = new Keyframes(document.getElementById('ball') as HTMLElement);
(window as any).ball = ball;

// example callback function
const cbElem = document.getElementById('cb') as HTMLElement;

const coinWidth = 45;

// Adding a new animation sequences (keyframe)
Keyframes.define([{
    name: 'ball-move',
    '0%': {
        marginLeft: '0',
    },
    '50%': {
        marginLeft: `${800-coinWidth}px`,
    },
    '100%': {
        marginLeft: '0',
    },
}, {
    name: 'ball-move-half',
    '0%': {
        marginLeft: '0',
    },
    '100%': {
        marginLeft: `${800-coinWidth}px`,
    },
}, {
    name: 'ball-spin',
    from: {
        transform: 'rotate(0deg)',
    },
    to: {
        transform: 'rotate(360deg)',
    },
},
bezierPath({ name: 'bezier' }, [0, 0], [0, 0], [100, -50], [-50, 100]),
circlePath({ name: 'circle' }, [0, 0], 30),
spriteSheet({
    name: 'spritesheet',
    rows: 8,
    cols: 1,
    height: 384,
    width: 45,
})
]);

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
            }, {
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
            }, {
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
            }, {
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
            }, {
                onIteration: increment,
                onEnd: increment,
            });

            break;
        case 'multi':
        // play multiple animations
            ball.play([
                'ball-spin 500ms linear 0s 6',
                {
                    name: 'ball-move',
                    duration: '3s',
                    timingFunction: 'ease',
                    iterationCount: 1,
                },
            ],
            {
                onIteration: increment,
            },
            );
            break;
        default:

        case 'queued':
            // play queued animations using callbacks
            ball.queue({
                name: 'ball-spin',
                duration: '1s',
                iterationCount: 1,
            }, {
                onEnd: increment,
            });

            ball.queue({
                name: 'ball-move',
                duration: '1s',
                iterationCount: 1,
            });
            break;

        case 'loop':
            // play looped animations using callbacks
            ball.loop([{
                name: 'ball-move-half',
                duration: '1s',
                iterationCount: 1,
            }, {
                name: 'ball-move-half',
                duration: '1s',
                iterationCount: 1,
                direction: 'reverse'
            }], {
                onEnd: increment,
            });
            break;

        case 'bezier':
            // play bezier path
            ball.play('bezier 5s ease 0s 1', {
                onIteration: increment,
                onEnd: increment,
            });
            break;
        
        case 'circle':
            // play bezier path
            ball.play('circle 1s ease 0s 3', {
                onIteration: increment,
                onEnd: increment,
            });
            break;

        case 'spritesheet':
            // play bezier path
            ball.play(playSpriteSheet('spritesheet', '1s', 'infinite'), {
                onIteration: increment,
                onEnd: increment,
            });
            break;
    }
};

Keyframes.define({
  name: "pong-move",
  from: {
    top: "50%",
    left: "20px"
  },
  to: {
    top: "50%",
    left: "calc(100% - 20px)"
  }
});

const pong = new Keyframes(document.querySelectorAll(".ball")[0] as HTMLElement);

pong.loop(["pong-move 3s linear 1", "pong-move 3s linear 1 reverse"]);
  