import React, { useMemo } from 'react';
import { Animated } from 'react-native';
import { Body } from '../../typography';

function TextInputErrors(_ref) {
  let {
    errors = [],
    error
  } = _ref;
  const isEmpty = useMemo(() => !errors.length && !error, [errors.length, error]);
  const containerStyle = useMemo(() => ({
    marginTop: isEmpty ? 0 : 4,
    marginLeft: isEmpty ? 0 : 12
  }), [isEmpty]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: containerStyle
  }, error && error[0] && /*#__PURE__*/React.createElement(Body, {
    size: "small",
    color: "error"
  }, error[1]), errors.map((_ref2, index) => {
    let [e, message] = _ref2;
    return e ? /*#__PURE__*/React.createElement(Body, {
      key: index,
      color: "error",
      size: "small"
    }, message) : null;
  }));
}

export default TextInputErrors;
//# sourceMappingURL=TextInputErrors.js.map