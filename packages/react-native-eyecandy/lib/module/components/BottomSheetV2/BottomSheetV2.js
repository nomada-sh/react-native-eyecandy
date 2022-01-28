import React, { useCallback, useMemo, useState } from 'react';
import { Modal, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, useAnimatedGestureHandler, withTiming, runOnJS, useCode, call } from 'react-native-reanimated';
import { gestureHandlerRootHOC, PanGestureHandler } from 'react-native-gesture-handler';
import { useUpdateEffect } from 'react-use';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
const HANDLE_HEIGHT = 40;

function Content(_ref) {
  let {
    children,
    height: initialHeight,
    visible,
    onDismiss,
    onClose,
    onOpen
  } = _ref;
  const height = useSharedValue(initialHeight);
  const open = useSharedValue(false);
  const {
    background,
    divider
  } = useColors(c => ({
    background: c.background.default,
    divider: c.divider.default
  }));
  const y = useSharedValue(height.value);
  const doOpenAnimation = useCallback(() => {
    'worklet';

    open.value = true;
    y.value = withSpring(0, {
      damping: 12
    }, () => {
      onOpen && runOnJS(onOpen)();
    });
  }, [onOpen, open, y]);
  const doCloseAnimation = useCallback(() => {
    'worklet';

    open.value = false;
    y.value = withTiming(height.value, {
      duration: 300
    }, () => {
      onClose && runOnJS(onClose)();
    });
  }, [height, onClose, open, y]);
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      y.value = ctx.startY + event.translationY;
    },
    onEnd: event => {
      if (height.value / 3 - event.translationY < 0) {
        onDismiss && runOnJS(onDismiss)();
      }

      y.value = withSpring(0);
    }
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: y.value
      }],
      height: height.value * 2,
      backgroundColor: background.content,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      overflow: 'hidden'
    };
  });
  useCode(() => call([], () => {
    if (visible && !open.value) {
      doOpenAnimation();
    } else if (!visible && open.value) {
      doCloseAnimation();
    }
  }), [visible, open]);
  return /*#__PURE__*/React.createElement(PanGestureHandler, {
    onGestureEvent: gestureHandler
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: animatedStyle
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      height: HANDLE_HEIGHT,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.handle, {
      backgroundColor: divider
    }]
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, children), /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      height: height.value
    }
  })));
}

const WrappedContent = gestureHandlerRootHOC(Content);

function BottomSheet(_ref2) {
  let {
    children,
    visible,
    height: initialHeight,
    onClose
  } = _ref2;
  const height = useMemo(() => initialHeight + HANDLE_HEIGHT, [initialHeight]);
  const [modalVisible, setModalVisible] = useState(visible);
  const handleClose = useCallback(() => {
    setModalVisible(false);
  }, []);
  useUpdateEffect(() => {
    if (visible) setModalVisible(visible);
  }, [visible]);
  return /*#__PURE__*/React.createElement(Modal, {
    animationType: "fade",
    visible: modalVisible,
    statusBarTranslucent: true,
    transparent: true,
    onRequestClose: onClose
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor: 'rgba(0,0,0,0.5)'
    }]
  }, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: onClose
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.mask
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      height
    }
  }, /*#__PURE__*/React.createElement(WrappedContent, {
    height: height,
    visible: visible,
    onDismiss: onClose,
    onClose: handleClose
  }, children))));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  mask: {
    flex: 1
  },
  handle: {
    height: 6,
    width: 64,
    borderRadius: 3
  }
});
export default BottomSheet;
//# sourceMappingURL=BottomSheetV2.js.map