import { defineAnimation, PhysicsAnimationState } from 'react-native-redash';

interface DecayAnimationState extends PhysicsAnimationState {
  lastTimestamp: number;
}

const VELOCITY_EPS = 5;
const DECELERATION = 0.997;

const withDecay = ({
  velocity: initialVelocity,
  onTranslate,
  clamp,
  calculateExact,
}: {
  velocity: number;
  /**
   * @worklet
   */
  onTranslate?: (x: number) => void;
  /**
   * @worklet
   */
  clamp?: (x: number) => number;
  /**
   * @worklet
   */
  calculateExact?: (x: number) => number;
}) => {
  'worklet';
  return defineAnimation<DecayAnimationState>(() => {
    'worklet';

    const onFrame = (state: DecayAnimationState, now: number) => {
      const { velocity, lastTimestamp, current } = state;

      const dt = now - lastTimestamp;

      const v0 = velocity / 1000;
      const kv = Math.pow(DECELERATION, dt);
      const v = v0 * kv * 1000;
      let x = current + (v0 * DECELERATION * (1 - kv)) / (1 - DECELERATION);
      if (calculateExact) x = calculateExact(x);
      if (clamp) x = clamp(x);

      if (onTranslate) onTranslate(x);

      state.velocity = v;
      state.current = x;
      state.lastTimestamp = now;

      return Math.abs(v) < VELOCITY_EPS;
    };

    const onStart = (
      state: DecayAnimationState,
      current: number,
      now: number,
    ) => {
      state.current = current;
      state.velocity = initialVelocity;
      state.lastTimestamp = now;
    };

    return {
      onFrame,
      onStart,
    };
  });
};

export default withDecay;
