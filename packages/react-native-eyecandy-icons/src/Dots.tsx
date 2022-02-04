import React from 'react';

import { Path } from 'react-native-svg';

import Icon, { IconProps } from './Icon';

const Dots = (props: IconProps) => (
  <Icon {...props}>
    <Path
      d="M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default React.memo(Dots);
