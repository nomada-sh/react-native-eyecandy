import React from 'react';

import { Path } from 'react-native-svg';

import Icon, { IconProps } from './Icon';

const StarFill = (props: IconProps) => (
  <Icon filled {...props}>
    <Path
      d="m12 17.75-6.172 3.245 1.179-6.873-5-4.867 6.9-1 3.086-6.253 3.086 6.253 6.9 1-5 4.867 1.179 6.873L12 17.75Z"
      fill="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default React.memo(StarFill);
