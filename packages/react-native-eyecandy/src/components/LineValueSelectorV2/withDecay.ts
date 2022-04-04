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

const withDecay = ({
  velocity: initialVelocity,
  clamp = [],
  calculateExact,
  tickGap,
  onTick,
}: {
  velocity: number;
  /**
   * @worklet
   */
  clamp?: [number?, number?];
  /**
   * @worklet
   */
  calculateExact?: (x: number) => number;
  onTick?: (tick: number, velocity: number) => void;
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

      let finished = false;

      if (clamp) {
        const min = clamp[0];
        const max = clamp[1];

        if (min !== undefined && initialVelocity < 0 && state.current <= min) {
          state.current = min;
          finished = true;
        } else if (
          max !== undefined &&
          initialVelocity > 0 &&
          state.current >= max
        ) {
          state.current = max;
          finished = true;
        }
      }

      if (onTick) runOnJS(onTick)(state.current, finished ? 0 : v / tickGap);

      return finished || Math.abs(v) < VELOCITY_EPS;
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

export default withDecay;
