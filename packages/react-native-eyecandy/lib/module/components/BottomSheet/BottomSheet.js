function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { Platform } from 'react-native';
import RBSheet from './RBSheet';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
const DARK_MASK_COLOR = 'rgba(0, 0, 0, 0.75)',
      LIGHT_MASK_COLOR = 'rgba(0, 0, 0, 0.5)';
const BottomSheet = /*#__PURE__*/React.forwardRef((_ref, forwardedRef) => {
  let {
    style,
    visible,
    customStyles,
    ...props
  } = _ref;
  // TODO: Create BottomSheet colors.
  const {
    dark,
    background,
    divider
  } = useTheme(t => ({
    dark: t.dark,
    background: t.colors.background.default,
    divider: t.colors.divider.default
  }));
  const ref = useRef(null);
  useImperativeHandle(forwardedRef, () => ({
    open: () => {
      var _ref$current;

      return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.open();
    },
    close: () => {
      var _ref$current2;

      return (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.close();
    }
  }));
  useEffect(() => {
    var _ref$current3, _ref$current4;

    if (visible) (_ref$current3 = ref.current) === null || _ref$current3 === void 0 ? void 0 : _ref$current3.open();else (_ref$current4 = ref.current) === null || _ref$current4 === void 0 ? void 0 : _ref$current4.close();
  }, [visible]);
  return /*#__PURE__*/React.createElement(RBSheet, _extends({
    customStyles: {
      wrapper: [{
        backgroundColor: dark ? DARK_MASK_COLOR : LIGHT_MASK_COLOR
      }, customStyles.wrapper],
      container: [{
        backgroundColor: background.container,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 20,
        paddingTop: 0
      }, customStyles.container, style],
      draggableIcon: [{
        backgroundColor: divider,
        width: 64,
        marginBottom: 20
      }, customStyles.draggableIcon]
    }
  }, props, {
    ref: ref
  }));
});
BottomSheet.defaultProps = {
  closeOnDragDown: true,
  animationType: 'none',
  height: 260,
  minClosingHeight: 0,
  openDuration: 300,
  closeDuration: 200,
  dragFromTopOnly: false,
  closeOnPressMask: true,
  closeOnPressBack: true,
  keyboardAvoidingViewEnabled: Platform.OS === 'ios',
  customStyles: {},
  onClose: () => {},
  onOpen: () => {}
};
export default BottomSheet;
//# sourceMappingURL=BottomSheet.js.map