import { runOnJS } from 'react-native-reanimated';
import { defineAnimation, PhysicsAnimationState } from 'react-native-redash';

interface DecayAnimationState extends PhysicsAnimationState {
  lastTimestamp: number;
  startTimestamp: number;
}

const VELOCITY_EPS = 1;
const DECELERATION = 0.997;
const SLOPE_FACTOR = 0.1;
const VELOCITY_FACTOR = 0.5;

const withTickDecay = ({
  velocity: initialVelocity,
  clamp = [],
  calculateExact,
  tickGap,
  onDecay,
  onEnd,
}: {
  velocity: number;
  clamp?: [number?, number?];
  /**
   * @worklet
   */
  calculateExact?: (x: number) => number;
  onDecay?: (tick: number, velocity: number) => void;
  onEnd?: (tick: number) => void;
  tickGap: number;
}) => {
  'worklet';
  return defineAnimation<DecayAnimationState>(() => {
    'worklet';

    const onFrame = (state: DecayAnimationState, now: number) => {
      const { velocity, lastTimestamp, startTimestamp, current } = state;

      const dt = Math.min(now - lastTimestamp, 64);
      const x0 = current * tickGap;
      const v =
        velocity *
        Math.exp(-(1 - DECELERATION) * (now - startTimestamp) * SLOPE_FACTOR);
      let x = x0 + (v * VELOCITY_FACTOR * dt) / 1000; // /1000 because time is in ms not in s
      if (calculateExact) x = calculateExact(x);

      state.velocity = v;
      state.current = x / tickGap;
      state.lastTimestamp = now;

      let clampFinished = false;

      if (clamp) {
        const min = clamp[0];
        const max = clamp[1];

        if (min !== undefined && initialVelocity < 0 && state.current <= min) {
          state.current = min;
          clampFinished = true;
        } else if (
          max !== undefined &&
          initialVelocity > 0 &&
          state.current >= max
        ) {
          state.current = max;
          clampFinished = true;
        }
      }

      if (onDecay)
        runOnJS(onDecay)(state.current, clampFinished ? 0 : v / tickGap);

      const finished = clampFinished || Math.abs(v) < VELOCITY_EPS;

      if (finished && onEnd) runOnJS(onEnd)(state.current);

      return finished;
    };

    const onStart = (
      state: DecayAnimationState,
      current: number,
      now: number,
    ) => {
      state.current = current;
      state.velocity = initialVelocity;
      state.lastTimestamp = now;
      state.startTimestamp = now;
    };

    return {
      onFrame,
      onStart,
    };
  });
};

export default withTickDecay;
