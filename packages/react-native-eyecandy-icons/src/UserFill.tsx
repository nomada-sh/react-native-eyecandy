import React from 'react';

import {Path} from 'react-native-svg';

import Icon, {IconProps} from './Icon';

const UserFill = (props: IconProps) => (
  <Icon filled {...props}>
    <Path
      d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
      fill="currentColor"
    />
    <Path
      d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2H6Z"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default React.memo(UserFill);
