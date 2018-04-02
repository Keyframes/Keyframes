const assert = require('assert');
describe('Core', () => {
    describe('Keyframes', () => {
        it('Should hold an instance of Keyframes in the window object', async () => {
            const kf = await browser.evaluate(() => {
                return window.Keyframes;
            });
            assert.notEqual(typeof kf, 'undefined');
        }).timeout(5000);
    });
});