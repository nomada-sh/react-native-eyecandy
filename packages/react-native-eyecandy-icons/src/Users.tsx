import React, {memo} from 'react';

import {Path} from 'react-native-svg';

import Icon, {IconProps} from './Icon';

const SvgComponent = (props: IconProps) => (
  <Icon {...props}>
    <Path
      d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2m1-17.87a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

const Users = memo(SvgComponent);
export default Users;
