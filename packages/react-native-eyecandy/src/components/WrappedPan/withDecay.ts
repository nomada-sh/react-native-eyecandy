import { defineAnimation, PhysicsAnimationState } from 'react-native-redash';

interface DecayAnimationState extends PhysicsAnimationState {
  lastTimestamp: number;
  startTimestamp: number;
}

const VELOCITY_EPS = 1;
const DECELERATION = 0.998;
const SLOPE_FACTOR = 0.1;
const VELOCITY_FACTOR = 0.5;

const withDecay = ({
  velocity: initialVelocity,
  // clamp = [],
  onActive,
  onEnd,
}: {
  velocity: number;
  clamp?: [number?, number?];
  /**
   * @worklet
   */
  onActive?: (x: number, velocity: number) => void;
  /**
   * @worklet
   */
  onEnd?: (x: number, velocity: number) => void;
}) => {
  'worklet';
  return defineAnimation<DecayAnimationState>(() => {
    'worklet';

    const onFrame = (state: DecayAnimationState, now: number) => {
      const { velocity, lastTimestamp, startTimestamp, current } = state;

      const dt = Math.min(now - lastTimestamp, 64);
      const x0 = current;
      const v =
        velocity *
        Math.exp(-(1 - DECELERATION) * (now - startTimestamp) * SLOPE_FACTOR);
      let x = x0 + (v * VELOCITY_FACTOR * dt) / 1000; // /1000 because time is in ms not in s

      state.velocity = v;
      state.current = x;
      state.lastTimestamp = now;

      // let clampFinished = false;

      // if (clamp) {
      //   const min = clamp[0];
      //   const max = clamp[1];

      //   if (min !== undefined && initialVelocity < 0 && state.current <= min) {
      //     state.current = min;
      //     clampFinished = true;
      //   } else if (
      //     max !== undefined &&
      //     initialVelocity > 0 &&
      //     state.current >= max
      //   ) {
      //     state.current = max;
      //     clampFinished = true;
      //   }
      // }

      if (onActive) onActive(state.current, state.velocity);

      const finished = Math.abs(v) < VELOCITY_EPS;

      if (finished && onEnd) onEnd(state.current, state.velocity);

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

export default withDecay;
