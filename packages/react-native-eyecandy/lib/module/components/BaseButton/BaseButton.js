function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { usePressableStyles } from '../../hooks';
import useStyles from './useStyles';

function BaseButton(_ref) {
  let {
    children,
    style,
    buttonStyle,
    inverse,
    color,
    variant,
    height,
    fullwidth,
    disabled: disabledProp,
    loading,
    styles: customStyles = {},
    hideDisabledOverlay,
    ...props
  } = _ref;
  const disabled = useMemo(() => disabledProp || loading, [disabledProp, loading]);
  const styles = useStyles({
    color,
    inverse,
    variant,
    height,
    disabled,
    fullwidth
  });
  const getButtonStyle = usePressableStyles([styles.button, buttonStyle, customStyles.button]);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, style, customStyles.container]
  }, /*#__PURE__*/React.createElement(Pressable, _extends({
    style: getButtonStyle,
    android_ripple: {
      color: styles.ripple.color
    },
    disabled: disabled
  }, props), children), disabled && !hideDisabledOverlay ? /*#__PURE__*/React.createElement(View, {
    style: styles.disabled
  }) : null, loading ? /*#__PURE__*/React.createElement(View, {
    style: styles.loadingContainer
  }, /*#__PURE__*/React.createElement(ActivityIndicator, {
    size: "large",
    color: styles.loading.color
  })) : null);
}

export default BaseButton;
//# sourceMappingURL=BaseButton.js.map