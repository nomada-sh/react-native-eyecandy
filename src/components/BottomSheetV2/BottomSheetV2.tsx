import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
  runOnUI,
  useCode,
  call,
} from 'react-native-reanimated';

import {
  gestureHandlerRootHOC,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import { useUpdateEffect } from 'react-use';

import { useTheme } from '../../hooks';
import Switch from '../Switch';

type Context = {
  startY: number;
};

export interface ContentProps {
  children?: React.ReactNode;
  height: number;
  visible?: boolean;
  onDismiss?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
}

function Content({
  children,
  height,
  visible,
  onDismiss,
  onClose,
  onOpen,
}: ContentProps) {
  const open = useSharedValue(false);

  const { palette } = useTheme();
  const y = useSharedValue(height);

  const doOpenAnimation = useCallback(() => {
    'worklet';

    open.value = true;
    y.value = withSpring(0, { damping: 12 }, () => {
      onOpen && runOnJS(onOpen)();
    });
  }, [onOpen, open, y]);

  const doCloseAnimation = useCallback(() => {
    'worklet';

    open.value = false;
    y.value = withTiming(height, { duration: 300 }, () => {
      onClose && runOnJS(onClose)();
    });
  }, [height, onClose, open, y]);

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
        onDismiss && runOnJS(onDismiss)();
      } else {
        y.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: y.value }],
      height: height * 2,
      backgroundColor: palette.background.content,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      paddingTop: 10,
    };
  });

  useCode(
    () =>
      call([], () => {
        if (visible && !open.value) {
          doOpenAnimation();
        } else if (!visible && open.value) {
          doCloseAnimation();
        }
      }),
    [visible, open],
  );

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
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
  const [contentVisible, setContentVisible] = useState<boolean | undefined>(
    true,
  );

  useUpdateEffect(() => {
    setContentVisible(visible);
  }, [visible]);

  return (
    <Modal
      animationType="fade"
      visible={visible}
      statusBarTranslucent
      transparent
      onRequestClose={() => setContentVisible(false)}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        ]}
      >
        <TouchableWithoutFeedback onPress={() => setContentVisible(false)}>
          <View style={styles.mask} />
        </TouchableWithoutFeedback>
        <View
          style={{
            height,
          }}
        >
          <Switch value={contentVisible} onValueChange={setContentVisible} />
          <WrappedContent
            height={height}
            visible={contentVisible}
            onDismiss={() => setContentVisible(false)}
            onClose={onClose}
          >
            {children}
          </WrappedContent>
        </View>
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
