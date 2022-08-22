import React from 'react';

import { Path } from 'react-native-svg';

import { SvgIconContainer } from '../core';
import { SvgIconProps } from '../types';

const Icon = (props: SvgIconProps) => (
  <SvgIconContainer {...props}>
    <Path d="m13.063 11.65-.355.354.355.354 4.3 4.29v.001a.498.498 0 0 1 0 .71l-.002.003a.498.498 0 0 1-.71 0l-.001-.001-4.29-4.3-.354-.355-.354.355-4.29 4.3-.001.001a.498.498 0 0 1-.71 0l-.003-.003a.5.5 0 0 1 0-.71l4.3-4.29.356-.355-.355-.354-4.3-4.29a.504.504 0 0 1 .713-.713l4.29 4.3.354.355.354-.355 4.29-4.3a.504.504 0 0 1 .712.714l-4.3 4.29Z" />
  </SvgIconContainer>
);

export const Close = React.memo(Icon);
