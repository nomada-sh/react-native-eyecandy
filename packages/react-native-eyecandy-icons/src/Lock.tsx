import React, { memo } from 'react';

import { Path } from 'react-native-svg';

import Icon, { IconProps } from './Icon';

const SvgComponent = (props: IconProps) => (
  <Icon {...props}>
    <Path
      d="M8 11V7a4 4 0 0 1 8 0v4m-9 0h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Zm6 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

const Lock = memo(SvgComponent);
export default Lock;
