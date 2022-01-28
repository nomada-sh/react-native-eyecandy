function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Modal, TouchableOpacity, Animated, PanResponder, StyleSheet, Platform } from 'react-native';
const SUPPORTED_ORIENTATIONS = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];

class RBSheet extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "panResponder", void 0);

    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY()
    };
    this.panResponder = PanResponder.create({});
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

      Animated.spring(animatedHeight, {
        toValue: height,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(animatedHeight, {
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
          animatedHeight: new Animated.Value(0)
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
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnDragDown,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, {
            dy: pan.y
          }], {
            useNativeDriver: false
          })(e, gestureState);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (height / 4 - gestureState.dy < 0) onClose === null || onClose === void 0 ? void 0 : onClose();
        Animated.spring(pan, {
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
    return /*#__PURE__*/React.createElement(Modal, {
      transparent: true,
      animationType: animationType,
      visible: modalVisible,
      supportedOrientations: SUPPORTED_ORIENTATIONS,
      onRequestClose: () => {
        if (closeOnPressBack) onClose === null || onClose === void 0 ? void 0 : onClose();
      }
    }, /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
      enabled: keyboardAvoidingViewEnabled,
      behavior: "padding",
      style: [styles.wrapper, customStyles.wrapper]
    }, /*#__PURE__*/React.createElement(TouchableOpacity, {
      style: styles.mask,
      activeOpacity: 1,
      onPress: () => closeOnPressMask ? this.close() : null
    }), /*#__PURE__*/React.createElement(Animated.View, _extends({}, !dragFromTopOnly && this.panResponder.panHandlers, {
      style: [panStyle, styles.container, {
        height: animatedHeight
      }, customStyles.container]
    }), closeOnDragDown && /*#__PURE__*/React.createElement(View, _extends({}, dragFromTopOnly && this.panResponder.panHandlers, {
      style: styles.draggableContainer
    }), /*#__PURE__*/React.createElement(View, {
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
  keyboardAvoidingViewEnabled: Platform.OS === 'ios',
  customStyles: {},
  onClose: () => {},
  onOpen: () => {}
});

const styles = StyleSheet.create({
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
export default RBSheet;
//# sourceMappingURL=RBSheet.js.map