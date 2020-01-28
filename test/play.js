const assert = require('assert');
const jsdom = require('mocha-jsdom');
const Keyframes = require('../dist/keyframes').default;

global.requestAnimationFrame = cb => setTimeout(cb);

const preload = async () => {
    await browser.evaluate(() => {
        Keyframes.define([{
            name: 'ball-roll',
            from: {
                transform: 'rotate(0deg)'
            }
        }, {
            name: 'ball-roll2',
            from: {
                transform: 'rotate(5deg)'
            }
        }]);
        window.elem = document.createElement('div');
        document.body.appendChild(window.elem);
        window.kf = new Keyframes(window.elem);
    });
};

const animationIncludesTest = (haystack, needles) => {
    for (let i = 0; i < needles.length; i += 1) {
        if (haystack.includes(needles[i])) {
            return true;
        }
    }
    return false;
};

describe('Play', () => {
    
    describe('#play()', () => {
        before(preload);
        it('Should be able to play an animation', async () => {
            const animation = await browser.evaluate(async () => {
                return new Promise((resolve, reject) => {
                    kf.play('ball-roll 0.1s', {
                        onEnd: () => {
                            resolve(window.elem.style.animation);
                        }
                    });
                });
            });
            assert(animationIncludesTest(animation, ['ball-roll', '0.1s']));
        });

        it('Should execute callbacks', async () => {
            const result = await browser.evaluate(async () => {
                return new Promise((resolve, reject) => {
                    const events = [];

                    kf.play('ball-roll 0.05s linear 0s 5 normal forwards', {
                        onBeforeStart: () => {
                            events.push(1);
                        },
                        onStart: () => {
                            events.push(2);
                        },
                        onIteration: () => {
                            events.push(3);
                        },
                        onEnd: () => {
                            resolve(events);
                        }
                    });
                });
            });
            assert.deepEqual(result, [1,2,3,3,3,3]);
        });

        it('Should execute cancel callback', async () => {
            const count = await browser.evaluate(async () => {
                return new Promise((resolve, reject) => {
                    kf.play('ball-roll 0.2s linear 0s infinite', {
                        onIteration: () => {
                            kf.play('ball-roll2 0.1s linear 0s infinite normal forwards');
                        },
                        onCancel: () => {
                            resolve(true);
                        }
                    });
                });
            });
            assert(count);
        });
    });

});

module.exports = {
    animationIncludesTest
}