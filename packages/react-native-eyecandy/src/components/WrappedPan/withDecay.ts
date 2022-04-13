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
  onMoving,
  onEnd,
}: {
  velocity: number;
  /**
   * @worklet
   */
  onMoving?: (x: number) => void;
  onEnd?: (x: number) => void;
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

      onMoving && onMoving(state.current);

      const finished = Math.abs(v) < VELOCITY_EPS;

      if (finished && onEnd) onEnd(state.current);

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
