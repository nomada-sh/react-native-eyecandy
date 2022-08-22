import React from 'react';

import { Path } from 'react-native-svg';

import { SvgIconContainer } from '../core';
import { SvgIconProps } from '../types';

const Icon = (props: SvgIconProps) => (
  <SvgIconContainer {...props}>
    <Path d="M3.95 11.5h16.1a.45.45 0 0 1 .45.45v.1a.45.45 0 0 1-.45.45H3.95a.45.45 0 0 1-.45-.45v-.1a.45.45 0 0 1 .45-.45ZM3.95 16.5h16.1a.45.45 0 0 1 .45.45v.1a.45.45 0 0 1-.45.45H3.95a.45.45 0 0 1-.45-.45v-.1a.45.45 0 0 1 .45-.45ZM3.95 6.5h16.1a.45.45 0 0 1 .45.45v.1a.45.45 0 0 1-.45.45H3.95a.45.45 0 0 1-.45-.45v-.1a.45.45 0 0 1 .45-.45Z" />
  </SvgIconContainer>
);

export const Menu = React.memo(Icon);
