"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _palette = require("../palette");

var _typography = require("../typography");

var _getButtonColors = _interopRequireDefault(require("./getButtonColors"));

var _getTextColors = _interopRequireDefault(require("./getTextColors"));

var _getInputColors = _interopRequireDefault(require("./getInputColors"));

var _getSwitchColors = _interopRequireDefault(require("./getSwitchColors"));

var _getBackgroundColors = _interopRequireDefault(require("./getBackgroundColors"));

var _getDividerColors = _interopRequireDefault(require("./getDividerColors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createColors = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const variables = {
    dark: Boolean(options.dark),
    palette: (0, _palette.createPalette)(options.palette),
    typography: (0, _typography.createTypography)(options.typography)
  };
  const partialColors = options.colors instanceof Function ? options.colors(variables) : options.colors || {};
  return {
    button: (0, _getButtonColors.default)({ ...variables,
      colors: partialColors.button
    }),
    text: (0, _getTextColors.default)({ ...variables,
      colors: partialColors.text
    }),
    input: (0, _getInputColors.default)({ ...variables,
      colors: partialColors.input
    }),
    switch: (0, _getSwitchColors.default)({ ...variables,
      colors: partialColors.switch
    }),
    background: (0, _getBackgroundColors.default)({ ...variables,
      colors: partialColors.background
    }),
    divider: (0, _getDividerColors.default)({ ...variables,
      colors: partialColors.divider
    })
  };
};

var _default = createColors;
exports.default = _default;
//# sourceMappingURL=createColors.js.map