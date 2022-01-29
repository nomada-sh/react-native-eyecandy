import React, {memo} from 'react';

import {Path} from 'react-native-svg';

import Icon, {IconProps} from './Icon';

const SvgComponent = (props: IconProps) => (
  <Icon {...props}>
    <Path
      d="m5 12 5 5L20 7"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

const Check = memo(SvgComponent);
export default Check;
