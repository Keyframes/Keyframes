const assert = require('assert');
describe('Pathfinder', () => {
    beforeEach(async () => {
        await browser.evaluate(() => {
            Keyframes.clearRules();
        });
    });

    describe('#bezierPath()', () => {
        it('Should define correct css and add to header', async () => {
            const stylesheet = await browser.evaluate(async () => {
                Keyframes.define(Keyframes.bezierPath({ name: 'curvy', bezierSteps: 3 }, [1,1], [400,1], [200,300]));
                return Keyframes.sheet.cssRules[0].cssText;
            });
            const expected = `@keyframes curvy { 
  100% { transform: translate(400px, 1px); }
  67% { transform: translate(207.667px, 133.889px); }
  33% { transform: translate(60px, 67.4444px); }
  0% { transform: translate(1px, 1px); }
}`;
            assert.equal(expected, stylesheet);
        });
    });

    describe('#circlePath()', () => {
        it('Should define correct css and add to header', async () => {
            const stylesheet = await browser.evaluate(async () => {
                Keyframes.define(Keyframes.circlePath({ name: 'circle', circleSteps: 3 }, [1,1], 20));
                return Keyframes.sheet.cssRules[0].cssText;
            });
            const expected = `@keyframes circle { 
  0% { transform: translate(1px, -19px); }
  33% { transform: translate(18.3205px, 11px); }
  67% { transform: translate(-16.3205px, 11px); }
  100% { transform: translate(1px, -19px); }
}`;
            assert.equal(expected, stylesheet);
        });
    });
});
