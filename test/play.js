const assert = require('assert');

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
            const count = await browser.evaluate(async () => {
                return new Promise((resolve, reject) => {
                    let count = 0;

                    kf.play('ball-roll 0.1s linear 0s 5 normal forwards', {
                        onBeforeStart: () => {
                            count += 1;
                        },
                        onStart: () => {
                            count += 1;
                        },
                        onIteration: () => {
                            count += 1;
                        },
                        onEnd: () => {
                            resolve(count);
                        }
                    });
                });
            });
            assert.equal(count, 6);
        });
    });

    describe('#queue()', () => {
        before(preload);
        it('Should be able to queue animations', async () => {
            const animation = await browser.evaluate(async () => {
                return new Promise((resolve, reject) => {
                    kf.queue(['ball-roll 0.1s'], {
                        onEnd: () => {
                            resolve(window.elem.style.animation);
                        }
                    });
                });
            });
            assert(animationIncludesTest(animation, ['ball-roll', '0.1s']));
        });

        it('Should be able to add queue items on the fly', async () => {
            const animation = await browser.evaluate(async () => {
                return new Promise((resolve, reject) => {
                    kf.resetQueue().then(() => {
                        kf.queue(['ball-roll 0.1s'], {
                            onEnd: () => {
                                resolve(window.elem.style.animation);
                            }
                        });
                        kf.queue('ball-roll2 0.1s');
                    });
                });
            });
            assert(animationIncludesTest(animation, ['ball-roll2', '0.1s']));
        });
    });

    describe('#chain()', () => {
        before(preload);
        it('Should be able to chain animations', async () => {
            const animation = await browser.evaluate(async () => {
                return new Promise((resolve, reject) => {
                    kf.chain(['ball-roll 0.1s', 'ball-roll2 0.1s'], {
                        onEnd: () => {
                            resolve(window.elem.style.animation);
                        }
                    });
                });
            });
            assert(animationIncludesTest(animation, ['ball-roll2', '0.1s']));
        });
    });
});
