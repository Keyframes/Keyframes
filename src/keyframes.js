import addPx from 'add-px-to-style';
import hyphenate from 'hyphenate-style-name';

const wait = () => new Promise((accept) => {
    requestAnimationFrame(() => {
        accept();
    });
});

const objToCss = (obj) => {
    const keys = Object.keys(obj)
    if (!keys.length) { return ''; }
    let i, result = '';
    const len = keys.length;

    for (i = 0; i < len; i++) {
        const key = keys[i]
        const val = obj[key]
        result += hyphenate(key) + ':' + addPx(key, val) + ';'
    }

    return result
};

class Keyframes {
    constructor(elem) {
        this.elem = elem;
        this.queueStore = [];
    }

    static isSupported() {
        return document.body.style.animationName !== undefined;
    }

    async reset() {
        this.removeEvents();
        this.elem.style.animationPlayState = 'running';
        this.elem.style.animation = 'none';
        await wait();
        return this;
    }

    pause() {
        this.elem.style.animationPlayState = 'paused';
        return this;
    }

    resume() {
        this.elem.style.animationPlayState = 'running';
        return this;
    }

    play(animationOptions, callbacks) {
        if (this.elem.style.animationName === this.getAnimationName(animationOptions)) {
            requestAnimationFrame(async () => {
                await this.reset();
                this.play(animationOptions, callbacks);
            });
            return this;
        }

        const {
            onBeforeStart, onStart, onIteration, onEnd,
        } = callbacks || {};

        const animationcss = Keyframes.playCSS(animationOptions);

        const addEvent = (type, eventCallback) => {
            const listenerName = `${type}Listener`;
            this.elem.removeEventListener(type, this[listenerName]);
            this[listenerName] = eventCallback;
            this.elem.addEventListener(type, this[listenerName]);
        };

        if (onBeforeStart) {
            onBeforeStart();
        }

        this.elem.style.animationPlayState = 'running';
        this.elem.style.animation = animationcss;

        if (onIteration) {
            addEvent('animationiteration', onIteration);
        }
        if (onEnd) {
            addEvent('animationend', onEnd);
        }
        if (onStart) {
            requestAnimationFrame(onStart);
        }
        return this;
    }

    removeEvents() {
        this.elem.removeEventListener('animationiteration', this.animationiterationListener);
        this.elem.removeEventListener('animationend', this.animationendListener);
        return this;
    }

    playNext() {
        const animationOption = this.queueStore.pop();
        if (animationOption) {
            this.play(animationOption, {
                onEnd: () => this.playNext(),
                onIteration: this.callbacks.onIteration,
            });
        } else if (this.callbacks.onEnd) {
            this.callbacks.onEnd();
        }
    }

    updateCallbacks(callbacks) {
        if (callbacks) {
            this.callbacks = {
                ...this.callbacks,
                ...callbacks,
            };
        }
    }

    queue(animationOptions, callbacks) {
        const currentQueueLength = this.queueStore.length;
        this.updateCallbacks(callbacks);

        if (animationOptions.constructor === Array) {
            this.queueStore = animationOptions.reverse().concat(this.queueStore);
        } else {
            this.queueStore.unshift(animationOptions);
        }

        if (!currentQueueLength) {
            if (this.callbacks.onBeforeStart) {
                this.callbacks.onBeforeStart();
            }
            this.playNext(callbacks);
            if (this.callbacks.onStart) {
                requestAnimationFrame(this.callbacks.onStart);
            }
        }
        return this;
    }

    async resetQueue() {
        await wait();
        this.removeEvents();
        this.queueStore = [];
        await this.reset();
        return this;
    }

    async chain(animationOptions, callbacks) {
        await this.resetQueue();
        this.queue(animationOptions, callbacks);
        return this;
    }

    getAnimationName(frameOptions) {
        switch (frameOptions.constructor) {
        case Array: {
            return frameOptions.map(this.getAnimationName).join(', ');
        }
        case String: {
            return frameOptions.split(' ')[0];
        }
        default: {
            return frameOptions.name;
        }
        }
    }

    static playCSS(frameOptions) {
        const animObjToStr = (obj) => {
            const newObj = {
                duration: '0s',
                timingFunction: 'ease',
                delay: '0s',
                iterationCount: 1,
                direction: 'normal',
                fillMode: 'forwards',
                ...obj,
            };

            return [
                newObj.name,
                newObj.duration,
                newObj.timingFunction,
                newObj.delay,
                newObj.iterationCount,
                newObj.direction,
                newObj.fillMode,
            ].join(' ');
        };

        if (frameOptions.constructor === Array) {
            const frameOptionsStrings = [];
            for (let i = 0; i < frameOptions.length; i += 1) {
                frameOptionsStrings.push(frameOptions[i].constructor === String
                    ? frameOptions[i]
                    : animObjToStr(frameOptions[i]));
            }
            return frameOptionsStrings.join(', ');
        } if (frameOptions.constructor === String) {
            return frameOptions;
        }

        return animObjToStr(frameOptions);
    }

    static generateCSS(frameData) {
        let css = `@keyframes ${frameData.name} {`;
        for (const key in frameData) {
            if (key !== 'name' && key !== 'media' && key !== 'complete') {
                
                const cssRuleObject = objToCss(frameData[key]);
                css += `${key} {${cssRuleObject}}`;
            }
        }
        css += '}';

        if (frameData.media) {
            css = `@media ${frameData.media}{${css}}`;
        }
        return css;
    }

    static generate(frameData) {
        const css = this.generateCSS(frameData);

        const oldFrameIndex = this.rules.indexOf(frameData.name);
        if (oldFrameIndex > -1) {
            this.sheet.deleteRule(oldFrameIndex);
            delete this.rules[oldFrameIndex];
        }
        const ruleIndex = Keyframes.sheet.insertRule(css, 0);
        Keyframes.rules[ruleIndex] = frameData.name;
    }

    static define(frameData) {
        if (frameData.length) {
            for (let i = 0; i < frameData.length; i += 1) {
                this.generate(frameData[i]);
            }
        } else {
            this.generate(frameData);
        }
    }

    static defineCSS(frameData) {
        if (frameData.length) {
            let css = '';
            for (let i = 0; i < frameData.length; i += 1) {
                css += this.generateCSS(frameData[i]);
            }
            return css;
        }
        return this.generateCSS(frameData);
    }

    static plugin(pluginFunc) {
        if (pluginFunc.constructor === Array) {
            for (let i = 0; i < pluginFunc.length; i += 1) {
                pluginFunc[i](this);
            }
        } else {
            pluginFunc(this);
        }
    }
}

if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.setAttribute('id', 'keyframesjs-stylesheet');
    document.head.appendChild(style);
    Keyframes.sheet = style.sheet;
    Keyframes.rules = [];
    window.Keyframes = Keyframes;
}

export default Keyframes;
