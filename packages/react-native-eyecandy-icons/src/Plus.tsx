import React from 'react';

import { Path } from 'react-native-svg';

import Icon, { IconProps } from './Icon';

const Plus = (props: IconProps) => (
  <Icon {...props}>
    <Path
      d="M12 5v14m-7-7h14"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default React.memo(Plus);
