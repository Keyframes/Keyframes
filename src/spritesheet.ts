import { isBrowser } from "./keyframes";
import { KeyframeObject, KeyframeRule, IterationCount } from "./types/keyframes";

type SpriteSheetOptions = {
    name: string,
    rows?: number,
    cols?: number,
    height?: number,
    width?: number,
    offsetX?: number,
    offsetY?: number,
    count?: number,
    spriteWidth?: number,
    spriteHeight?: number,
    loop?: boolean,
};

export const spriteSheet = ({
    rows = 1,
    cols = 1,
    width = 0,
    height = 0,
    ...rest
}: SpriteSheetOptions): KeyframeObject => {
    const defaults = {
        offsetX: 0,
        offsetY: 0,
        count: rows * cols,
        spriteWidth: width / cols,
        spriteHeight: height / rows,
        loop: true,
    };

    const opts = { ...defaults, rows, cols, width, height, ...rest };

    const spriteStep = 100 / opts.count;
    const spriteFrames: KeyframeRule = {};
    let x = opts.offsetX;
    let y = opts.offsetY;
    for (let i = 0; i < opts.count; i += 1) {
        spriteFrames[`${Math.round(spriteStep * i)}%`] = {
            backgroundPosition: `-${x}px -${y}px`,
        };
        if (x >= opts.width - opts.spriteWidth) {
            y += opts.spriteHeight;
        } else {
            x += opts.spriteWidth;
        }
    }

    return Object.assign({}, { name: opts.name }, spriteFrames);
};

export const playSpriteSheet = (name: string, time: string | 0, loops: IterationCount = 'infinite'): string => {
    if (loops && loops < 0) {
        loops = 'infinite';
    }

    return `${name} ${time} steps(1) ${loops}`;
};

if (isBrowser) {
    const _window = (window as any);
    if (_window.Keyframes) {
        _window.Keyframes.spriteSheet = spriteSheet;
        _window.Keyframes.playSpriteSheet = playSpriteSheet;
    }
}
