import React, { useCallback, useMemo, useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
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
import { useUpdateEffect } from 'react-use';

const HANDLE_HEIGHT = 40;

const clamp = (value: number, lowerBound: number, upperBound: number) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

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
  style?: StyleProp<ViewStyle>;
  testID?: string;
  disableAnimations?: boolean;
}

function Content({
  children,
  height: initialHeight,
  visible,
  onDismiss,
  onClose,
  onOpen,
  style,
  testID,
  disableAnimations,
}: ContentProps) {
  const height = useSharedValue(initialHeight);
  const open = useSharedValue(false);

  const { background, divider } = useColors(c => ({
    background: c.background.default,
    divider: c.divider.default,
  }));
  const y = useSharedValue(height.value);

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

    y.value = withTiming(height.value, { duration: 300 }, () => {
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
      const newY = ctx.startY + event.translationY;
      y.value = clamp(newY, -height.value, height.value);
    },
    onEnd: event => {
      if (height.value / 3 - event.translationY < 0) {
        onDismiss && runOnJS(onDismiss)();
      } else y.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: disableAnimations ? 0 : y.value }],
      height: height.value * 2,
      backgroundColor: background.content,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      overflow: 'hidden',
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
    <PanGestureHandler
      onGestureEvent={gestureHandler}
      enabled={!disableAnimations}
    >
      <Animated.View style={animatedStyle} testID={testID}>
        <View
          style={{
            height: HANDLE_HEIGHT,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={[
              styles.handle,
              {
                backgroundColor: divider,
              },
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
            height: height.value,
          }}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}

const WrappedContent = gestureHandlerRootHOC(Content);

export interface BottomSheetProps {
  children?: React.ReactNode;
  visible?: boolean;
  height: number;
  onClose?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
  disableAnimations?: boolean;
}

function BottomSheet({
  children,
  visible = false,
  height: initialHeight,
  onClose,
  contentStyle,
  testID,
  disableAnimations,
}: BottomSheetProps) {
  const height = useMemo(() => initialHeight + HANDLE_HEIGHT, [initialHeight]);
  const [modalVisible, setModalVisible] = useState<boolean | undefined>(
    visible,
  );

  const handleClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  useUpdateEffect(() => {
    if (visible) {
      setModalVisible(visible);
    }
  }, [visible]);

  return (
    <Modal
      testID={`${testID}-modal`}
      animationType={disableAnimations ? 'none' : 'fade'}
      visible={modalVisible}
      statusBarTranslucent
      transparent
      onRequestClose={onClose}
    >
      <View
        testID={`${testID}-container`}
        style={[
          styles.container,
          {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        ]}
      >
        <TouchableWithoutFeedback testID={`${testID}-mask`} onPress={onClose}>
          <View style={styles.mask} />
        </TouchableWithoutFeedback>
        <View
          testID={`${testID}-content-container`}
          style={{
            height,
          }}
        >
          <WrappedContent
            disableAnimations={disableAnimations}
            testID={`${testID}-content`}
            style={contentStyle}
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
  handle: {
    height: 6,
    width: 64,
    borderRadius: 3,
  },
});

export default BottomSheet;
