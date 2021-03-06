const assert = require('assert');
const Keyframes = require('../dist/keyframes').default;

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