
export interface KeyframeAnimationObject {
    name: string;
    duration?: string | 0;
    timingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step-start' | 'step-end' | 'initial' | 'inherit' | string;
    delay?: string | 0;
    iterationCount?: IterationCount;
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | 'initial' | 'inherit';
    fillMode?: 'none' | 'forwards' | 'backwards' | 'both' | 'initial' | 'inherit';
}

export type KeyframeAnimationOptionArray = Array<KeyframeAnimationObject | string>;
export type KeyframeAnimationOptions = KeyframeAnimationOptionArray | KeyframeAnimationObject | string;
export type KeyframeRule = {
    [key: string]: Partial<CSSStyleDeclaration>;
};

export type KeyframeObject = {
    name: string;
} & KeyframeRule;
export type KeyframeOptions = KeyframeObject | KeyframeObject[];

export type PublicCssStyleKeys = keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule' | number>;

export type RuleCache = {
    [key: string]: PublicCssStyleKeys[];
}

export type KeyframeEventName = 'animationiteration' | 'animationend' | 'animationstart' | 'animationcancel';
export type KeyframeEventListenerName = 'animationcancelListener' | 'animationendListener' | 'animationiterationListener' | 'animationstartListener';

export interface KeyframeCallbacks {
    onStart?: EventListener;
    onIteration?: EventListener;
    onEnd?: EventListener;
    onCancel?: VoidFunction;
    onBeforeStart?: VoidFunction;
    onQueueComplete?: VoidFunction;
}

export type IterationCount = number | 'infinite';