import React from 'react';

import { Path } from 'react-native-svg';

import Icon, { IconProps } from './Icon';

const UserPlus = (props: IconProps) => (
  <Icon {...props}>
    <Path
      d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M19 8v6m-3-3h6-6Z"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default React.memo(UserPlus);
