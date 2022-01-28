function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import BottomSheet from '../BottomSheet';
import SwipeButton from '../SwipeButton';
import { Body } from '../../typography';

function BottomSheetSwipeConfirmation(_ref) {
  let {
    title,
    swipeTitle,
    style,
    onConfirm,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(BottomSheet, _extends({
    style: [{
      alignItems: 'center'
    }, style]
  }, props), /*#__PURE__*/React.createElement(Body, {
    color: "greyout",
    align: "center",
    weight: "medium",
    style: {
      marginBottom: 16
    }
  }, title), /*#__PURE__*/React.createElement(SwipeButton, {
    onSwipeSuccess: onConfirm,
    title: swipeTitle
  }));
}

BottomSheetSwipeConfirmation.defaultProps = { ...BottomSheet.defaultProps,
  height: 170,
  closeOnPressMask: false
};
export default BottomSheetSwipeConfirmation;
//# sourceMappingURL=BottomSheetSwipeConfirmation.js.map