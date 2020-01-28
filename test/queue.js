const assert = require('assert');
const jsdom = require('mocha-jsdom');
const Keyframes = require('../dist/keyframes').default;
const { animationIncludesTest } = require('./play');

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

describe('#queue()', () => {
    describe('Queueing', () => {
        jsdom({ url: "http://localhost" });
        it('Should be able to queue animations', () => {
            const kf = new Keyframes(document.createElement("div"));
            kf.queue(['ball-roll 0.1s']);
            assert(animationIncludesTest(kf.queueStore[0], ['ball-roll', '0.1s']));
        });

        it('Should add multiple animations to the queue', () => {
            const kf = new Keyframes(document.createElement("div"));
            kf.queue(['ball-roll 0.1s']);
            kf.queue('ball-roll2 0.1s');
            assert.equal(kf.queueStore.length, 2);
        });
    });
    
    describe('Playing', () => {
        before(preload);
        it('Should play last animation onEnd', async () => {
            const animation = await browser.evaluate(async () => {
                return new Promise((resolve, reject) => {
                    kf.queue(['ball-roll 0.1s']);
                    kf.queue('ball-roll2 0.1s', {
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

describe('#loop()', () => {
    before(preload);
    it('Should be able to loop animations', async () => {
        const animation = await browser.evaluate(async () => {
            return new Promise((resolve, reject) => {
                let count = 0;
                kf.loop(['ball-roll 0.1s', 'ball-roll2 0.1s'], {
                    onEnd: () => {
                        if (count > 1) {
                            resolve(true);
                        } else {
                            count += 1;
                        }
                    }
                });
            });
        });
        assert(animation);
    });
});