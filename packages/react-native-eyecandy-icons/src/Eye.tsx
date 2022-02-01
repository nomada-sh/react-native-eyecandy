import React, { memo } from 'react';

import { Path } from 'react-native-svg';

import Icon, { IconProps } from './Icon';

const SvgComponent = (props: IconProps) => (
  <Icon {...props}>
    <Path
      d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7Z"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

const Eye = memo(SvgComponent);
export default Eye;
