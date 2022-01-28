"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _typography = require("../../../../typography");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const EN_NAMES = 'SMTWTFS'.split('');
const ES_NAMES = 'DLMMJVS'.split('');

function Header(_ref) {
  let {
    debug,
    locale,
    month,
    year
  } = _ref;
  const count = (0, _react.useRef)(1);
  debug && console.log('HEADER', `${month}/${year},`, 'RENDER COUNT:', count.current++);
  const names = (0, _react.useMemo)(() => {
    if (locale) {
      if (/^es(-[A-Za-z]{2})?$/.test(locale)) return ES_NAMES;
      if (/^en(-[A-Za-z]{2})?$/.test(locale)) return EN_NAMES;
    }

    return EN_NAMES;
  }, [locale]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, names.map((name, index) => {
    return /*#__PURE__*/_react.default.createElement(_typography.Body, {
      weight: "bold",
      color: "greyout",
      align: "center",
      key: index,
      style: styles.name
    }, name);
  }));
}

const styles = _reactNative.StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row'
  },
  name: {
    width: '14.28%',
    height: 40,
    textAlignVertical: 'center'
  }
});

var _default = /*#__PURE__*/_react.default.memo(Header);

exports.default = _default;
//# sourceMappingURL=Header.js.map