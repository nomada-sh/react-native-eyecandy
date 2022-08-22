import React from 'react';

import { Path } from 'react-native-svg';

import { SvgIconContainer } from '../core';
import { SvgIconProps } from '../types';

const Icon = (props: SvgIconProps) => (
  <SvgIconContainer {...props}>
    <Path d="M19.87 19.9H4.128a1.301 1.301 0 0 1-1.139-1.927l-.438-.24.438.24 7.872-14.31a1.3 1.3 0 0 1 2.278 0l7.872 14.31.438-.24-.438.24a1.3 1.3 0 0 1-1.14 1.927ZM12.964 3.759a1.1 1.1 0 0 0-1.928 0l-7.87 14.312a1.1 1.1 0 0 0 .963 1.63h15.743a1.099 1.099 0 0 0 .964-1.628L12.964 3.758ZM12 8.9a.1.1 0 0 1 .1.1v4.8a.1.1 0 0 1-.17.07.1.1 0 0 1-.03-.07V9a.1.1 0 0 1 .1-.1Z" />
    <Path d="M12.5 16a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
  </SvgIconContainer>
);

export const Warning = React.memo(Icon);
