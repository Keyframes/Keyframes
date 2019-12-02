import addPx from 'add-px-to-style';
import hyphenate from 'hyphenate-style-name';

const wait = (): Promise<void> => new Promise(accept => {
    requestAnimationFrame(() => {
        accept();
    });
});

export interface KeyframeAnimationObject {
    name: string;
    duration?: string;
    timingFunction?: string;
    delay?: string;
    iterationCount?: string;
    direction?: string;
    fillMode?: string;
}

export type KeyframeAnimationOptionArray = (KeyframeAnimationObject | string | unknown)[];
export type KeyframeAnimationOptions = KeyframeAnimationOptionArray | KeyframeAnimationObject | string;

export type KeyframeRule = {
    [key: string]: Partial<CSSStyleDeclaration>;
};

type PublicCssStyleKeys = keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule' | number>;

type RuleCache = {
    [key: string]: PublicCssStyleKeys[];
}

export type KeyframeObject = {
    name: string;
} & KeyframeRule;

export type KeyframeOptions = string | KeyframeObject | KeyframeObject[];

export type KeyframeEventName = 'animationiteration' | 'animationend';
export type KeyframeEventListenerName = 'animationendListener' | 'animationiterationListener';

export type KeyframePlugin = (kf: typeof Keyframes) => void;

interface KeyframeCallbacks {
    onStart?: FrameRequestCallback;
    onBeforeStart?: VoidFunction;
    onIteration?: VoidFunction;
    onEnd?: VoidFunction;
}

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
            this.mountedElement.removeEventListener(type, this[listenerName] as EventListener);
            this[listenerName] = eventCallback;
            this.mountedElement.addEventListener(type, this[listenerName] as EventListener);
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

    removeEvents() {
        this.mountedElement.removeEventListener('animationiteration', this.animationiterationListener);
        this.mountedElement.removeEventListener('animationend', this.animationendListener);
        return this;
    }

    playNext() {
        const animationOption = this.queueStore.pop() as KeyframeAnimationOptions;
        if (animationOption) {
            this.play(animationOption, {
                onEnd: () => this.playNext(),
                onIteration: this.callbacks.onIteration,
            });
        } else if (this.callbacks.onEnd) {
            this.callbacks.onEnd();
        }
    }

    updateCallbacks(callbacks: KeyframeCallbacks) {
        if (callbacks) {
            this.callbacks = {
                ...this.callbacks,
                ...callbacks,
            };
        }
    }

    queue(animationOptions: KeyframeAnimationOptions, callbacks: KeyframeCallbacks) {
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

    async resetQueue() {
        await wait();
        this.removeEvents();
        this.queueStore = [];
        await this.reset();
        return this;
    }

    async chain(animationOptions: KeyframeAnimationOptions, callbacks: KeyframeCallbacks) {
        await this.resetQueue();
        this.queue(animationOptions, callbacks);
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
        switch (animationObject.constructor) {
            case Array: {
                return (animationObject as KeyframeAnimationObject[]).map(this.getAnimationName).join(', ');
            }
            case String: {
                return (animationObject as string).split(' ')[0];
            }
            default: {
                return (animationObject as KeyframeAnimationObject).name;
            }
        }
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

        if (animationOptions.constructor === Array) {
            const animationOptionArray = animationOptions as KeyframeAnimationObject[];
            const animationOptionsStrings = [];
            for (let i = 0; i < animationOptionArray.length; i += 1) {
                animationOptionsStrings.push(animationOptionArray[i].constructor === String
                    ? animationOptionArray[i]
                    : animObjToStr(animationOptionArray[i]));
            }
            return animationOptionsStrings.join(', ');
        } if (animationOptions.constructor === String) {
            return animationOptions as string;
        }

        return animObjToStr(animationOptions as KeyframeAnimationObject);
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

        const oldFrameIndex = Keyframes.rules.indexOf(frameData.name as string);
        if (oldFrameIndex > -1) {
            Keyframes.sheet.deleteRule(oldFrameIndex);
            Keyframes.rules.splice(oldFrameIndex, 1);
        }
        const ruleIndex = (Keyframes.sheet.cssRules || Keyframes.sheet.rules).length;
        Keyframes.sheet.insertRule(css, ruleIndex);
        Keyframes.rules[ruleIndex] = frameData.name as string;
    }

    static define(frameOptions: KeyframeOptions) {
        if (Array.isArray(frameOptions)) {
            for (let i = 0; i < frameOptions.length; i += 1) {
                
                this.generate(frameOptions[i]);
            }
        } else if (typeof frameOptions === 'string') {
            this.generate(frameOptions);
        } else {
            this.generate(frameOptions);
        }
    }

    static defineCSS(frameOptions: KeyframeOptions) {
        if (frameOptions.length) {
            let css = '';
            for (let i = 0; i < frameOptions.length; i += 1) {
                css += this.generateCSS((frameOptions as KeyframeObject[])[i]);
            }
            return css;
        }
        return this.generateCSS(frameOptions as KeyframeObject);
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
