import React, { memo } from 'react';

import { Path } from 'react-native-svg';

import Icon, { IconProps } from './Icon';

const SvgComponent = (props: IconProps) => (
  <Icon {...props}>
    <Path
      d="M9 17v1a3 3 0 0 0 6 0v-1M10 5a2 2 0 1 1 4 0 7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6Z"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

const Notifications = memo(SvgComponent);
export default Notifications;
