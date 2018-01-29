const assert = require('assert');
const Keyframes = require('../dist/keyframes');

describe('Plugins', () => {
    describe('#plugin()', () => {
        it('should extend the keyframes class', () => {
            const plugin = (kf) => {
                kf.newFunc = () => true
            }

            plugin(Keyframes);

            assert.equal(true, Keyframes.newFunc());
        });
    });
});
