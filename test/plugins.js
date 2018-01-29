const assert = require('assert');
const Keyframes = require('../dist/keyframes.es6').default;

describe('Plugins', () => {
    describe('#plugin()', () => {
        it('should extend the keyframes class', () => {
            const plugin = (kf) => {
                kf.newFunc = () => true
            }

            Keyframes.plugin(plugin);

            assert.equal(true, Keyframes.newFunc());
        });
    });
});
