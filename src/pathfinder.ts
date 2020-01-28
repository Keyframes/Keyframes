import { isBrowser } from "./keyframes";
import { KeyframeObject, KeyframeRule } from "./types/keyframes";

type PathFinderOptions = {
  bezierSteps?: number;
  circleSteps?: number;
  transform?: string;
};

type PathFinderKeyframeOptions = PathFinderOptions & KeyframeObject;

type Vector = {
  x: number;
  y: number;
};

type ArrayVector = [number, number];

function getCirclePoint(radians: number, radius: number, center: Vector) {
  return {
    x: center.x + radius * Math.cos(radians),
    y: center.y + radius * Math.sin(radians)
  };
}

//= ===================================\\
// 13thParallel.org Beziér Curve Code \\
//   by Dan Pupius (www.pupius.net)   \\
//= ===================================\\

const coord = (x = 0, y = 0): Vector => {
  return { x, y };
};

const B1 = (t: number) => t * t * t;
const B2 = (t: number) => 3 * t * t * (1 - t);
const B3 = (t: number) => 3 * t * (1 - t) * (1 - t);
const B4 = (t: number) => (1 - t) * (1 - t) * (1 - t);

const getBezier = (
  percent: number,
  C1: Vector,
  C2: Vector,
  C3: Vector,
  C4: Vector
) => {
  const pos = coord();
  pos.x =
    C1.x * B1(percent) +
    C2.x * B2(percent) +
    C3.x * B3(percent) +
    C4.x * B4(percent);
  pos.y =
    C1.y * B1(percent) +
    C2.y * B2(percent) +
    C3.y * B3(percent) +
    C4.y * B4(percent);
  return pos;
};

export const bezierPath = (
  keyframeOptions: PathFinderKeyframeOptions,
  p1: ArrayVector,
  p2: ArrayVector,
  p3: ArrayVector,
  p4: ArrayVector
) => {
  const opts = { bezierSteps: 100, transform: "", ...keyframeOptions };
  if (p4 == null) {
    p4 = p1;
  }

  const vector1 = coord(p1[0], p1[1]);
  const vector2 = coord(p2[0], p2[1]);
  const vector3 = coord(p3[0], p3[1]);
  const vector4 = coord(p4[0], p4[1]);

  const points: KeyframeRule = {};
  const step = 1 / opts.bezierSteps;

  for (let i = 0; i <= 1.01; i += step) {
    const newPosition = getBezier(i, vector1, vector4, vector3, vector2);
    points[`${100 - Math.round(i * 100)}%`] = {
      transform: `translate(${newPosition.x}px,${newPosition.y}px) ${opts.transform}`
    };
  }

  return Object.assign({}, keyframeOptions, points);
};

export const circlePath = (
  keyframeOptions: PathFinderKeyframeOptions,
  center: ArrayVector,
  radius: number
) => {
  const opts = { circleSteps: 100, transform: "", ...keyframeOptions };

  const points: KeyframeRule = {};
  const newCenter = coord(center[0], center[1]);
  const pieandahalf = 1.5 * Math.PI;
  const notmuchpie = Math.PI / 180;
  const stepPercentage = 100 / opts.circleSteps;
  const stepDegree = 360 / opts.circleSteps;

  for (let i = 0; i <= opts.circleSteps; i += 1) {
    const degree = stepDegree * i;
    const radians = pieandahalf + degree * notmuchpie;
    const newpos = getCirclePoint(radians, radius, newCenter);
    points[`${Math.round(stepPercentage * i)}%`] = {
      transform: `translate(${newpos.x}px,${newpos.y}px) ${opts.transform}`
    };
  }

  for (const step in keyframeOptions) {
    const rules = keyframeOptions[step];
    for (const newstep in points) {
      const newrules = points[newstep];
      if (step === newstep) {
        if (newrules.transform && rules.transform) {
          points[
            newstep
          ].transform = `${newrules.transform} ${rules.transform}`;
          break;
        }
      }
    }
  }

  return Object.assign({}, keyframeOptions, points);
};

if (isBrowser) {
  const _window = window as any;
  if (_window.Keyframes) {
    _window.Keyframes.bezierPath = bezierPath;
    _window.Keyframes.circlePath = circlePath;
  }
}
