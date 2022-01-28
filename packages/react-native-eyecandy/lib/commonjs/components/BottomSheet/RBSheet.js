"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SUPPORTED_ORIENTATIONS = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];

class RBSheet extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "panResponder", void 0);

    this.state = {
      modalVisible: false,
      animatedHeight: new _reactNative.Animated.Value(0),
      pan: new _reactNative.Animated.ValueXY()
    };
    this.panResponder = _reactNative.PanResponder.create({});
    this.createPanResponder(props);
  }

  setModalVisible(visible) {
    const {
      height,
      minClosingHeight,
      openDuration,
      closeDuration,
      onClose,
      onOpen
    } = this.props;
    const {
      animatedHeight,
      pan
    } = this.state;

    if (visible) {
      this.setState({
        modalVisible: visible
      });
      onOpen === null || onOpen === void 0 ? void 0 : onOpen(); // Animated.timing(animatedHeight, {
      //   useNativeDriver: false,
      //   toValue: height,
      //   duration: openDuration,
      // }).start();

      _reactNative.Animated.spring(animatedHeight, {
        toValue: height,
        useNativeDriver: false
      }).start();
    } else {
      _reactNative.Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: minClosingHeight,
        duration: closeDuration
      }).start(() => {
        pan.setValue({
          x: 0,
          y: 0
        });
        this.setState({
          modalVisible: visible,
          animatedHeight: new _reactNative.Animated.Value(0)
        });
        onClose === null || onClose === void 0 ? void 0 : onClose();
      });
    }
  }

  createPanResponder(props) {
    const {
      closeOnDragDown = false,
      height,
      onClose
    } = props;
    const {
      pan
    } = this.state;
    this.panResponder = _reactNative.PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnDragDown,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          _reactNative.Animated.event([null, {
            dy: pan.y
          }], {
            useNativeDriver: false
          })(e, gestureState);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (height / 4 - gestureState.dy < 0) onClose === null || onClose === void 0 ? void 0 : onClose();

        _reactNative.Animated.spring(pan, {
          toValue: {
            x: 0,
            y: 0
          },
          useNativeDriver: false
        }).start();
      }
    });
  }

  open() {
    this.setModalVisible(true);
  }

  close() {
    this.setModalVisible(false);
  }

  render() {
    const {
      animationType,
      closeOnDragDown,
      dragFromTopOnly,
      closeOnPressMask,
      closeOnPressBack,
      children,
      customStyles = {},
      keyboardAvoidingViewEnabled,
      onClose
    } = this.props;
    const {
      animatedHeight,
      pan,
      modalVisible
    } = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform()
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
      transparent: true,
      animationType: animationType,
      visible: modalVisible,
      supportedOrientations: SUPPORTED_ORIENTATIONS,
      onRequestClose: () => {
        if (closeOnPressBack) onClose === null || onClose === void 0 ? void 0 : onClose();
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
      enabled: keyboardAvoidingViewEnabled,
      behavior: "padding",
      style: [styles.wrapper, customStyles.wrapper]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.mask,
      activeOpacity: 1,
      onPress: () => closeOnPressMask ? this.close() : null
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, _extends({}, !dragFromTopOnly && this.panResponder.panHandlers, {
      style: [panStyle, styles.container, {
        height: animatedHeight
      }, customStyles.container]
    }), closeOnDragDown && /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({}, dragFromTopOnly && this.panResponder.panHandlers, {
      style: styles.draggableContainer
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.draggableIcon, customStyles.draggableIcon]
    })), children)));
  }

}

_defineProperty(RBSheet, "defaultProps", {
  animationType: 'none',
  height: 260,
  minClosingHeight: 0,
  openDuration: 300,
  closeDuration: 200,
  closeOnDragDown: false,
  dragFromTopOnly: false,
  closeOnPressMask: true,
  closeOnPressBack: true,
  keyboardAvoidingViewEnabled: _reactNative.Platform.OS === 'ios',
  customStyles: {},
  onClose: () => {},
  onOpen: () => {}
});

const styles = _reactNative.StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#00000077'
  },
  mask: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: 0,
    overflow: 'hidden'
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  draggableIcon: {
    width: 35,
    height: 5,
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#ccc'
  }
});

var _default = RBSheet;
exports.default = _default;
//# sourceMappingURL=RBSheet.js.map