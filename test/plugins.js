const assert = require('assert');
const Keyframes = require('../dist/keyframes').default;

describe('Plugins', () => {
    describe('#plugin()', () => {
        it('should extend the keyframes class', () => {
            const plugin = (kf) => {
                kf.newFunc = () => true
            }

            Keyframes.plugin(plugin);

            assert.equal(true, Keyframes.newFunc());
        });

        it('should extend the keyframes class using an array', () => {
            const plugin = (kf) => {
                kf.newFunc = () => true
            }

            const plugin2 = (kf) => {
                kf.newFunc2 = () => true
            }

            Keyframes.plugin([plugin, plugin2]);

            assert.equal(true, Keyframes.newFunc());
            assert.equal(true, Keyframes.newFunc2());
        });
    });
});

describe('CSS', () => {
    describe('#playCSS()', () => {
        it('should return css for the animation rule', () => {

            const css = Keyframes.playCSS({
                name: 'ball-spin',
                duration: '1s',
                iterationCount: 1
            });

            assert.equal(css, "ball-spin 1s ease 0s 1 normal forwards");
        });
    });

    describe('#defineCSS()', () => {
        it('should return css defined keyframes', () => {

            let css = Keyframes.defineCSS({
                name: 'ball-spin',
                from: {
                    transform: 'rotate(90deg)',
                },
                to: {
                    transform: 'rotate(450deg)',
                },
            });

            assert.equal(css, "@keyframes ball-spin {from {transform:rotate(90deg);}to {transform:rotate(450deg);}}");

            css = Keyframes.defineCSS([{
                name: 'ball-spin',
                from: {
                    transform: 'rotate(90deg)',
                },
            }, {
                name: 'ball-spin2',
                from: {
                    transform: 'rotate(70deg)',
                },
            }]);

            assert.equal(css, "@keyframes ball-spin {from {transform:rotate(90deg);}}@keyframes ball-spin2 {from {transform:rotate(70deg);}}");

        });
    });
})