import React from 'react';

import { Path } from 'react-native-svg';

import { SvgIconContainer } from '../core';
import { SvgIconProps } from '../types';

const Icon = (props: SvgIconProps) => (
  <SvgIconContainer {...props}>
    <Path d="M.75 15.35a.25.25 0 0 1 .25.25v3.75a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V15.6a.25.25 0 1 1 .5 0v3.75a2.5 2.5 0 0 1-2.5 2.5H3a2.5 2.5 0 0 1-2.5-2.5V15.6a.25.25 0 0 1 .25-.25Z" />
    <Path d="M12.177 17.427a.249.249 0 0 1-.354 0l-.354.354.354-.354-4.5-4.5a.25.25 0 1 1 .354-.354l3.22 3.22.853.854V2.25a.25.25 0 1 1 .5 0v14.397l.854-.854 3.219-3.22a.25.25 0 1 1 .354.354l-4.5 4.5Z" />
  </SvgIconContainer>
);

export const Download = React.memo(Icon);
