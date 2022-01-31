import React from 'react';

import {Path} from 'react-native-svg';

import Icon, {IconProps} from './Icon';

const MoonSun = (props: IconProps) => (
  <Icon filled {...props}>
    <Path
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm0-2V4a8 8 0 0 1 0 16Z"
      fill="currentColor"
    />
  </Icon>
);

export default React.memo(MoonSun);
