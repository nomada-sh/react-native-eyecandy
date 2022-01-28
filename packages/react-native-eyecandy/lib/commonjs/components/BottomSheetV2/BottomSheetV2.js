"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _reactUse = require("react-use");

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  const height = (0, _reactNativeReanimated.useSharedValue)(initialHeight);
  const open = (0, _reactNativeReanimated.useSharedValue)(false);
  const {
    background,
    divider
  } = (0, _reactNativeEyecandyTheme.useColors)(c => ({
    background: c.background.default,
    divider: c.divider.default
  }));
  const y = (0, _reactNativeReanimated.useSharedValue)(height.value);
  const doOpenAnimation = (0, _react.useCallback)(() => {
    'worklet';

    open.value = true;
    y.value = (0, _reactNativeReanimated.withSpring)(0, {
      damping: 12
    }, () => {
      onOpen && (0, _reactNativeReanimated.runOnJS)(onOpen)();
    });
  }, [onOpen, open, y]);
  const doCloseAnimation = (0, _react.useCallback)(() => {
    'worklet';

    open.value = false;
    y.value = (0, _reactNativeReanimated.withTiming)(height.value, {
      duration: 300
    }, () => {
      onClose && (0, _reactNativeReanimated.runOnJS)(onClose)();
    });
  }, [height, onClose, open, y]);
  const gestureHandler = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onStart: (_, ctx) => {
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      y.value = ctx.startY + event.translationY;
    },
    onEnd: event => {
      if (height.value / 3 - event.translationY < 0) {
        onDismiss && (0, _reactNativeReanimated.runOnJS)(onDismiss)();
      }

      y.value = (0, _reactNativeReanimated.withSpring)(0);
    }
  });
  const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
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
  (0, _reactNativeReanimated.useCode)(() => (0, _reactNativeReanimated.call)([], () => {
    if (visible && !open.value) {
      doOpenAnimation();
    } else if (!visible && open.value) {
      doCloseAnimation();
    }
  }), [visible, open]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.PanGestureHandler, {
    onGestureEvent: gestureHandler
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: animatedStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height: HANDLE_HEIGHT,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.handle, {
      backgroundColor: divider
    }]
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, children), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      width: '100%',
      height: height.value
    }
  })));
}

const WrappedContent = (0, _reactNativeGestureHandler.gestureHandlerRootHOC)(Content);

function BottomSheet(_ref2) {
  let {
    children,
    visible,
    height: initialHeight,
    onClose
  } = _ref2;
  const height = (0, _react.useMemo)(() => initialHeight + HANDLE_HEIGHT, [initialHeight]);
  const [modalVisible, setModalVisible] = (0, _react.useState)(visible);
  const handleClose = (0, _react.useCallback)(() => {
    setModalVisible(false);
  }, []);
  (0, _reactUse.useUpdateEffect)(() => {
    if (visible) setModalVisible(visible);
  }, [visible]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    animationType: "fade",
    visible: modalVisible,
    statusBarTranslucent: true,
    transparent: true,
    onRequestClose: onClose
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor: 'rgba(0,0,0,0.5)'
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: onClose
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.mask
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height
    }
  }, /*#__PURE__*/_react.default.createElement(WrappedContent, {
    height: height,
    visible: visible,
    onDismiss: onClose,
    onClose: handleClose
  }, children))));
}

const styles = _reactNative.StyleSheet.create({
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

var _default = BottomSheet;
exports.default = _default;
//# sourceMappingURL=BottomSheetV2.js.map