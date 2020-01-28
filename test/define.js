const Keyframes = require('../dist/keyframes').default;
const assert = require('assert');
describe('Define', () => {

    beforeEach(async () => {
        await browser.evaluate(() => {
            Keyframes.clearRules();
        });
    });
    
    describe('#define()', () => {
        it('Should define css and add to header', async () => {
            const stylesheet = await browser.evaluate(() => {
                Keyframes.define({
                    name: 'ball-roll',
                    from: {
                        transform: 'rotate(0deg)',
                        backgroundColor: 'red',
                        width: 10,
                        height: 0
                    },
                });
                return Keyframes.sheet.cssRules[0].cssText;
            });
            const expected = `@keyframes ball-roll { 
  0% { transform: rotate(0deg); background-color: red; width: 10px; height: 0px; }
}`;
            assert.equal(expected, stylesheet);
        });
    });

    describe('#addToRuleCache()', () => {
        it('Should add defined css keys to a cache', () => {
            Keyframes.addToRuleCache({
                name: "test",
                from: {
                    width: 1
                },
                to: {
                    width: 2,
                    height: 1
                }
            });
            assert.deepEqual(Keyframes.ruleCache, { test: ['width', 'height'] });
        });
    });
});
