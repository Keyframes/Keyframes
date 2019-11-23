const assert = require('assert');
describe('Pathfinder', () => {
    beforeEach(async () => {
        await browser.evaluate(() => {
            Keyframes.clearRules();
        });
    });

    describe('#spriteSheet()', () => {
        it('Should define correct css and add to header', async () => {
            const stylesheet = await browser.evaluate(async () => {
                Keyframes.define(Keyframes.spriteSheet({
                    name: 'gem',
                    rows: 1,
                    cols: 7,
                    width: 210,
                    height: 180,
                    offsetX: 0,
                    offsetY: 0,
                    count: 7
                }));
                return Keyframes.sheet.cssRules[0].cssText;
            });
            const expected = `@keyframes gem { 
  0% { background-position: 0px 0px; }
  14% { background-position: -30px 0px; }
  29% { background-position: -60px 0px; }
  43% { background-position: -90px 0px; }
  57% { background-position: -120px 0px; }
  71% { background-position: -150px 0px; }
  86% { background-position: -180px 0px; }
}`;
            assert.equal(expected, stylesheet);
        });
    });

    describe('#playSpriteSheet()', () => {
        it('Should return a valid animate css value', async () => {
            const stylesheet = await browser.evaluate(async () => {
                return Keyframes.playSpriteSheet('test1', 5, 4);
            });
            const expected = `test1 5 steps(1) 4`;
            assert.equal(expected, stylesheet);
        });
    });
});
