const assert = require('assert');
describe('Define', () => {

    describe('#define()', () => {
        it('Should define css and add to header', async () => {
            const styleElem = await browser.evaluate(() => {
                Keyframes.define({
                    name: 'ball-roll',
                    from: {
                        transform: 'rotate(0deg)',
                    },
                });
                return document.getElementById('keyframesjs-stylesheet');
            });
            assert.notEqual(styleElem, null);
        });
    });
});
