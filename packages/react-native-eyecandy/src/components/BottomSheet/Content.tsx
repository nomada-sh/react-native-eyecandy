import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export interface ContentProps {
  children?: React.ReactNode;
  height: number;
  handleHeight: number;
  visible?: boolean;
  onDismiss?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
  style?: StyleProp<ViewStyle>;
  handleStyle?: StyleProp<ViewStyle>;
  testID?: string;
  disableAnimations?: boolean;
}

const clamp = (value: number, lowerBound: number, upperBound: number) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

type Context = {
  startY: number;
};

function Content({
  children,
  height,
  handleHeight,
  visible,
  onDismiss,
  onClose,
  onOpen,
  style,
  handleStyle,
  testID,
  disableAnimations,
}: ContentProps) {
  const { background, divider } = useColors(c => ({
    background: c.background.default,
    divider: c.divider.default,
  }));

  const fullHeight = 2 * height + handleHeight;

  const topY = -height;
  const bottomY = height + handleHeight;

  const y = useSharedValue(bottomY);
  const open = useSharedValue(false);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (_, ctx) => {
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      const newY = ctx.startY + event.translationY;
      y.value = clamp(newY, topY, bottomY);
    },
    onEnd: event => {
      if (height / 3 - event.translationY < 0 && onDismiss)
        runOnJS(onDismiss)();
      else y.value = withSpring(0);
    },
  });

  const containerStyle = useAnimatedStyle(() => {
    const translateY = disableAnimations ? 0 : y.value;

    return {
      transform: [{ translateY }],
      height: fullHeight,
      backgroundColor: background.content,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      overflow: 'hidden',
    };
  });

  useAnimatedReaction(
    () => open.value,
    isOpen => {
      const animateOpen = () => {
        'worklet';

        open.value = true;

        y.value = withSpring(0, { damping: 12 }, () => {
          onOpen && runOnJS(onOpen)();
        });
      };

      const animateClose = () => {
        'worklet';

        open.value = false;

        y.value = withTiming(bottomY, { duration: 300 }, () => {
          onClose && runOnJS(onClose)();
        });
      };

      if (visible && !isOpen) animateOpen();
      else if (!visible && isOpen) animateClose();
    },
    [visible, onOpen, onClose, bottomY],
  );

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      enabled={!disableAnimations}
    >
      <Animated.View style={containerStyle} testID={testID}>
        <View
          style={{
            height: handleHeight,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={[
              {
                height: 6,
                width: 64,
                borderRadius: 3,
                backgroundColor: divider,
              },
              handleStyle,
            ]}
          />
        </View>
        <View
          style={[
            {
              flex: 1,
            },
            style,
          ]}
        >
          {children}
        </View>
        <View
          style={{
            width: '100%',
            height,
          }}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}

export default gestureHandlerRootHOC(Content);
