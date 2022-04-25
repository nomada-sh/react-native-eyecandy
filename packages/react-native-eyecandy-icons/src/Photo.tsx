import React from 'react';

import { Path } from 'react-native-svg';

import Icon, { IconProps } from './Icon';

const Photo = (props: IconProps) => (
  <Icon {...props}>
    <Path
      d="M15 8h.01"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Z"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m4 15 4-4c.456-.439.973-.67 1.5-.67s1.044.231 1.5.67l5 5"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m14 14 1-1c.456-.439.973-.67 1.5-.67s1.044.231 1.5.67l2 2"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default React.memo(Photo);
