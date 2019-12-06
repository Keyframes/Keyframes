import { KeyframeAnimationOptions, RuleCache, PublicCssStyleKeys, KeyframeAnimationOptionArray, KeyframeCallbacks, KeyframeEventName, KeyframeEventListenerName, KeyframeAnimationObject, KeyframeObject, KeyframeOptions } from './types/keyframes';
import addPx from 'add-px-to-style';
import hyphenate from 'hyphenate-style-name';

const wait = (): Promise<void> => new Promise(accept => {
    requestAnimationFrame(() => {
        accept();
    });
});

export const isBrowser = typeof window !== 'undefined';

let keyframesSheet: CSSStyleSheet;
if (isBrowser) {
    const styleElem = document.createElement('style');
    styleElem.setAttribute('id', 'keyframesjs-stylesheet');
    document.head.appendChild(styleElem);
    keyframesSheet = styleElem.sheet as CSSStyleSheet;
}

const clone = (input: KeyframeAnimationOptions): KeyframeAnimationOptions => {
    if (Array.isArray(input)) {
        return [ ...input ];
    } else if (typeof input === 'object') {
        return { ...input }
    } else {
        return input.toString();
    }
}

const voidFunction = () => {};

const objToCss = (obj: CSSStyleDeclaration) => {
    if (!Object.keys(obj).length) { return ''; }
    let result = '';

    for (const key in obj) {
        result += `${hyphenate(key)}:${addPx(key, obj[key])};`;
    }

    return result;
};

class Keyframes {
    static sheet: CSSStyleSheet = keyframesSheet;

    static rules: string[] = [];

    static ruleCache: RuleCache = {};

    frozenStyles: PublicCssStyleKeys[];

    mountedElement: HTMLElement;

    queueStore: KeyframeAnimationOptionArray = [];

    callbacks: KeyframeCallbacks = {
        onStart: voidFunction,
        onBeforeStart: voidFunction,
        onIteration: voidFunction,
        onEnd: voidFunction,
    };

    animationendListener: EventListener = voidFunction;

    animationiterationListener: EventListener = voidFunction;

    constructor(elem: HTMLElement) {
        this.mountedElement = elem;
        this.frozenStyles = [];
    }

    static isSupported() {
        return document.body.style.animationName !== undefined;
    }

    freeze() {
        const ruleCache = Keyframes.ruleCache[this.mountedElement.style.animationName];
        if (ruleCache) {
            const computedStyle = { ...getComputedStyle(this.mountedElement) };
            ruleCache.forEach((rule) => {
                this.mountedElement.style[rule] = computedStyle[rule];
            });
            this.frozenStyles = [...new Set(this.frozenStyles.concat(ruleCache))];
        }
    }

    unfreeze() {
        if (this.frozenStyles.length) {
            this.frozenStyles.forEach((rule) => {
                this.mountedElement.style[rule] = '';
            });
            this.frozenStyles = [];
        }
    }

    async reset() {
        this.removeEvents();

        this.mountedElement.style.animationPlayState = 'running';
        this.mountedElement.style.animation = 'none';
        
        await wait();
        return this;
    }

    pause() {
        this.mountedElement.style.animationPlayState = 'paused';
        return this;
    }

    resume() {
        this.mountedElement.style.animationPlayState = 'running';
        return this;
    }

    play(animationOptions: KeyframeAnimationOptions, callbacks: KeyframeCallbacks) {
        if (this.mountedElement.style.animationName === this.getAnimationName(animationOptions)) {
            this.freeze();
            requestAnimationFrame(async () => {
                await this.reset();
                this.play(animationOptions, callbacks);
                this.unfreeze();
            });
            return this;
        }

        const {
            onBeforeStart = null,
            onStart = null,
            onIteration = null,
            onEnd = null,
        } = callbacks || {};

        const animationcss = Keyframes.playCSS(animationOptions);

        const addEvent = (type: KeyframeEventName, eventCallback: EventListener) => {
            const listenerName: KeyframeEventListenerName = `${type}Listener` as KeyframeEventListenerName;
            this.mountedElement.removeEventListener(type, this[listenerName]);
            this[listenerName] = eventCallback;
            this.mountedElement.addEventListener(type, this[listenerName]);
        };

        if (onBeforeStart) {
            onBeforeStart();
        }

        this.mountedElement.style.animationPlayState = 'running';
        this.mountedElement.style.animation = animationcss;

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

    playNext() {
        const animationOption = this.queueStore[this.queueStore.length-1];
        if (animationOption) {
            this.play(animationOption, {
                onEnd: () => {
                    this.queueStore.pop();
                    this.playNext()
                },
                onIteration: this.callbacks.onIteration,
            });
        } else if (this.callbacks.onEnd) {
            this.callbacks.onEnd();
        }
    }
    
    removeEvents() {
        this.mountedElement.removeEventListener('animationiteration', this.animationiterationListener);
        this.mountedElement.removeEventListener('animationend', this.animationendListener);
        return this;
    }

    updateCallbacks(callbacks?: KeyframeCallbacks) {
        if (callbacks) {
            this.callbacks = {
                ...this.callbacks,
                ...callbacks,
            };
        }
    }

    queue(animationOptions: KeyframeAnimationOptions, callbacks?: KeyframeCallbacks) {
        const currentQueueLength = this.queueStore.length;
        this.updateCallbacks(callbacks);

        const _animationOptions = clone(animationOptions);

        if (Array.isArray(_animationOptions)) {
            this.queueStore = _animationOptions.reverse().concat(this.queueStore);
        } else {
            this.queueStore.unshift(_animationOptions);
        }

        if (!currentQueueLength) {
            if (this.callbacks.onBeforeStart) {
                this.callbacks.onBeforeStart();
            }
            this.playNext();
            if (this.callbacks.onStart) {
                requestAnimationFrame(this.callbacks.onStart);
            }
        }
        return this;
    }

    // Deprecating
    chain(animationOptions: KeyframeAnimationOptions, callbacks?: KeyframeCallbacks) {
        console.warn("Keyframes: .chain is deprecated, please use .queue");
        this.queue(animationOptions, callbacks);
        return this;
    }

    async resetQueue() {
        await wait();
        this.removeEvents();
        this.queueStore = [];
        await this.reset();
        return this;
    }

    async loop(animationOptions: KeyframeAnimationOptions, callbacks: KeyframeCallbacks = {}) {
        await this.resetQueue();
        
        const populateQueue = () => {
            this.queue(animationOptions, { ...callbacks, onEnd: () => {
                if (callbacks.onEnd) {
                    callbacks.onEnd();
                }
                populateQueue();
            }});
        }
        populateQueue();
        return this;
    }

    getAnimationName(animationObject: KeyframeAnimationOptions): string {
        if (Array.isArray(animationObject)) {
            return animationObject.map((o) => this.getAnimationName(o)).join(', ');
        }
        if (typeof animationObject === 'string') {
            return animationObject.split(' ')[0];
        }
        
        return animationObject.name;
    }

    static playCSS(animationOptions: KeyframeAnimationOptions): string {
        const animObjToStr = (obj: KeyframeAnimationObject): string => {
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

        if (Array.isArray(animationOptions)) {
            const animationOptionsStrings = [];
            for (let i = 0; i < animationOptions.length; i += 1) {
                const option = animationOptions[i];
                animationOptionsStrings.push(typeof option === 'string'
                    ? option
                    : animObjToStr(option));
            }
            return animationOptionsStrings.join(', ');
        } if (typeof animationOptions === 'string') {
            return animationOptions;
        }

        return animObjToStr(animationOptions);
    }

    static generateCSS(frameData: KeyframeObject): string {
        let css = `@keyframes ${frameData.name} {`;
        for (const key in frameData) {
            if (key !== 'name' && key !== 'media' && key !== 'complete') {
                const cssRuleObject = objToCss(frameData[key] as CSSStyleDeclaration);
                css += `${key} {${cssRuleObject}}`;
            }
        }
        css += '}';

        if (frameData.media) {
            css = `@media ${frameData.media}{${css}}`;
        }
        return css;
    }

    static generate(frameData: KeyframeObject) {

        this.addToRuleCache(frameData);
        const css = this.generateCSS(frameData);

        const oldFrameIndex = Keyframes.rules.indexOf(frameData.name);
        if (oldFrameIndex > -1) {
            Keyframes.sheet.deleteRule(oldFrameIndex);
            Keyframes.rules.splice(oldFrameIndex, 1);
        }
        const ruleIndex = (Keyframes.sheet.cssRules || Keyframes.sheet.rules).length;
        Keyframes.sheet.insertRule(css, ruleIndex);
        Keyframes.rules[ruleIndex] = frameData.name;
    }

    static define(frameOptions: KeyframeOptions) {
        if (Array.isArray(frameOptions)) {
            for (let i = 0; i < frameOptions.length; i += 1) {
                this.generate(frameOptions[i]);
            }
        } else {
            this.generate(frameOptions);
        }
    }

    static defineCSS(frameOptions: KeyframeOptions) {
        if (Array.isArray(frameOptions)) {
            let css = '';
            for (let i = 0; i < frameOptions.length; i += 1) {
                css += this.generateCSS(frameOptions[i]);
            }
            return css;
        }
        return this.generateCSS(frameOptions);
    }

    static clearRules = () => {
        Keyframes.rules = [];
        while (Keyframes.sheet.cssRules.length) {
            Keyframes.sheet.deleteRule(0);
        }
    }

    static addToRuleCache (frameData: KeyframeObject) {
        if (!this.ruleCache[frameData.name]) {
            const rules: PublicCssStyleKeys[] = Object.values(frameData)
                .filter(v => typeof v === 'object')
                .map(v => Object.keys(v) as PublicCssStyleKeys[]).flat();
            this.ruleCache[frameData.name] = [...new Set(rules)];
        }
    }
}

if (isBrowser) {
    (window as any).Keyframes = Keyframes;
}

export * from './pathfinder';
export * from './spritesheet';

export default Keyframes;
