import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  FadeInDown,
  SlideInDown,
  SlideInUp,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import {
  gestureHandlerRootHOC,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { useUpdateEffect } from 'react-use';

type Context = {
  startY: number;
};

export interface ContentProps {
  children?: React.ReactNode;
  height: number;
  onClose?: () => void;
  closeRequested?: boolean;
}

function Content({ children, height, onClose, closeRequested }: ContentProps) {
  const y = useSharedValue(0);

  const close = () => {
    'worklet';

    y.value = withTiming(height, { duration: 300 }, () => {
      onClose && runOnJS(onClose)();
    });
  };

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (_, ctx) => {
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      y.value = ctx.startY + event.translationY;
    },
    onEnd: event => {
      if (height / 3 - event.translationY < 0) {
        close();
      } else {
        y.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: y.value }],
      height: height * 2,
      backgroundColor: 'white',
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      paddingTop: 10,
    };
  });

  const entering = () => {
    'worklet';

    const animations = {
      transform: [
        {
          translateY: withSpring(0, {
            damping: 15,
          }),
        },
      ],
    };

    const initialValues = {
      transform: [{ translateY: height }],
    };

    return { initialValues, animations };
  };

  useUpdateEffect(() => {
    if (closeRequested) close();
  }, [closeRequested]);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={animatedStyle} entering={entering}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
}

const WrappedContent = gestureHandlerRootHOC(Content);

export interface BottomSheetV2Props {
  children?: React.ReactNode;
  visible?: boolean;
  height: number;
  onClose?: () => void;
}

function BottomSheetV2({
  children,
  visible,
  height,
  onClose,
}: BottomSheetV2Props) {
  const [closeRequested, setCloseRequested] = useState(false);

  return (
    <Modal
      animationType="fade"
      visible={visible}
      statusBarTranslucent
      transparent
      onRequestClose={() => setCloseRequested(true)}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        ]}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.mask} />
        </TouchableWithoutFeedback>
        <WrappedContent
          onClose={() => {
            setCloseRequested(false);
            onClose?.();
          }}
          height={height}
          closeRequested={closeRequested}
        >
          {children}
        </WrappedContent>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  mask: {
    flex: 1,
  },
  content: {},
});

export default BottomSheetV2;
