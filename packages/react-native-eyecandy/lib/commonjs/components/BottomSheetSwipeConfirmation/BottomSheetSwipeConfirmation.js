"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _BottomSheet = _interopRequireDefault(require("../BottomSheet"));

var _SwipeButton = _interopRequireDefault(require("../SwipeButton"));

var _typography = require("../../typography");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function BottomSheetSwipeConfirmation(_ref) {
  let {
    title,
    swipeTitle,
    style,
    onConfirm,
    ...props
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_BottomSheet.default, _extends({
    style: [{
      alignItems: 'center'
    }, style]
  }, props), /*#__PURE__*/_react.default.createElement(_typography.Body, {
    color: "greyout",
    align: "center",
    weight: "medium",
    style: {
      marginBottom: 16
    }
  }, title), /*#__PURE__*/_react.default.createElement(_SwipeButton.default, {
    onSwipeSuccess: onConfirm,
    title: swipeTitle
  }));
}

BottomSheetSwipeConfirmation.defaultProps = { ..._BottomSheet.default.defaultProps,
  height: 170,
  closeOnPressMask: false
};
var _default = BottomSheetSwipeConfirmation;
exports.default = _default;
//# sourceMappingURL=BottomSheetSwipeConfirmation.js.map