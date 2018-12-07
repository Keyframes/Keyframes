require('es6-object-assign/auto');

class Keyframes {
    constructor(elem) {
        this.elem = elem;
    }

    isSupported() {
        return document.body.style.animationName !== undefined;
    }

    reset(callback) {
        this.removeEvents();
        this.elem.style.animationPlayState = 'running';
        this.elem.style.animation = 'none';

        if (callback) {
            requestAnimationFrame(callback);
        }
    }

    pause() {
        this.elem.style.animationPlayState = 'paused';
    }

    resume() {
        this.elem.style.animationPlayState = 'running';
    }

    play(frameOptions, callback) {
        if (this.elem.style.animationName === frameOptions.name) {
            this.reset(() => this.play(frameOptions, callback));
            return this;
        }

        const animationcss = Keyframes.playCSS(frameOptions);

        const addEvent = (type, eventCallback) => {
            const listenerName = `${type}Listener`;
            this.elem.removeEventListener(type, this[listenerName]);
            this[listenerName] = eventCallback;
            this.elem.addEventListener(type, this[listenerName]);
        };

        this.elem.style.animationPlayState = 'running';
        this.elem.style.animation = animationcss;
        this.frameOptions = frameOptions;

        addEvent('animationiteration', callback || frameOptions.complete);
        addEvent('animationend', callback || frameOptions.complete);
        return this;
    }

    removeEvents() {
        this.elem.removeEventListener('animationiteration', this.animationiterationListener);
        this.elem.removeEventListener('animationend', this.animationendListener);
    }

    static playCSS(frameOptions) {
        const animObjToStr = function (obj) {
            const newObj = Object.assign({}, {
                duration: '0s',
                timingFunction: 'ease',
                delay: '0s',
                iterationCount: 1,
                direction: 'normal',
                fillMode: 'forwards',
            }, obj);

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
                frameOptionsStrings.push(typeof frameOptions[i] === 'string'
                    ? frameOptions[i]
                    : animObjToStr(frameOptions[i]));
            }
            return frameOptionsStrings.join(', ');
        } if (typeof frameOptions === 'string') {
            return frameOptions;
        }

        return animObjToStr(frameOptions);
    }

    static generateCSS(frameData) {
        let css = `@keyframes ${frameData.name} {`;
        for (const key in frameData) {
            if (key !== 'name' && key !== 'media' && key !== 'complete') {
                css += `${key} {`;

                for (const property in frameData[key]) {
                    css += `${property}:${frameData[key][property]};`;
                }

                css += '}';
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

        const oldFrameIndex = Keyframes.rules.indexOf(frameData.name);
        if (oldFrameIndex > -1) {
            Keyframes.sheet.deleteRule(oldFrameIndex);
            delete Keyframes.rules[oldFrameIndex];
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
                pluginFunc[i](Keyframes);
            }
        } else {
            pluginFunc(Keyframes);
        }
    }
}

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.setAttribute('id', 'keyframesjs-stylesheet');
    document.head.appendChild(style);
    Keyframes.sheet = style.sheet;
    Keyframes.rules = [];
}

export default Keyframes;
