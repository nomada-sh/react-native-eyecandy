import {
  defineAnimation,
  AnimationParameter,
  animationParameter,
  AnimationState,
} from 'react-native-redash';

// TODO: Type this.

function withWrapper(
  animationParam: AnimationParameter,
  /**
   * @worklet
   */
  onFrameCallback: (state: any) => void,
) {
  'worklet';
  return defineAnimation(() => {
    'worklet';

    const nextAnimation = animationParameter(animationParam);

    const onFrame = (state: AnimationState, now: number) => {
      const finished = nextAnimation.onFrame(nextAnimation, now);

      state.current = nextAnimation.current;
      onFrameCallback(nextAnimation);

      return finished;
    };

    const onStart = (
      _state: AnimationState,
      current: number,
      now: number,
      previousAnimation: AnimationState,
    ) => {
      nextAnimation.onStart(nextAnimation, current, now, previousAnimation);
    };

    return {
      onFrame,
      onStart,
    };
  });
}

export default withWrapper;
