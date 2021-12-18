import React, { useCallback, useState } from 'react';
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
      }

      y.value = withSpring(0);
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

export interface BottomSheetProps {
  children?: React.ReactNode;
  visible?: boolean;
  height: number;
  onClose?: () => void;
}

function BottomSheet({ children, visible, height, onClose }: BottomSheetProps) {
  const [modalVisible, setModalVisible] = useState<boolean | undefined>(
    visible,
  );

  const handleClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  useUpdateEffect(() => {
    if (visible) setModalVisible(visible);
  }, [visible]);

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      statusBarTranslucent
      transparent
      onRequestClose={onClose}
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
        <View
          style={{
            height,
          }}
        >
          <WrappedContent
            height={height}
            visible={visible}
            onDismiss={onClose}
            onClose={handleClose}
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

export default BottomSheet;
