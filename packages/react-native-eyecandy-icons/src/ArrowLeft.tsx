import React, {memo} from 'react';

import {Path} from 'react-native-svg';

import Icon, {IconProps} from './Icon';

const SvgComponent = (props: IconProps) => (
  <Icon {...props}>
    <Path
      d="M5 12h14M5 12l6 6m-6-6 6-6"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

const ArrowLeft = memo(SvgComponent);
export default ArrowLeft;
