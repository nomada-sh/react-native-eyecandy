import React, { memo } from 'react';
import { Path } from 'react-native-svg';
import Icon from './Icon';

const SvgComponent = props => /*#__PURE__*/React.createElement(Icon, props, /*#__PURE__*/React.createElement(Path, {
  d: "M18 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM16 3v4M8 3v4M4 11h16",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement(Path, {
  d: "M8 15h2v2H8v-2Z",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

const CalendarEvent = /*#__PURE__*/memo(SvgComponent);
export default CalendarEvent;
//# sourceMappingURL=CalendarEvent.js.map