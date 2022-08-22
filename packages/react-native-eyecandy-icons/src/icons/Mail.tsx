import React, { memo } from 'react';

import { Path } from 'react-native-svg';

import { SvgIconContainer } from '../core';
import { SvgIconProps } from '../types';

const Icon = (props: SvgIconProps) => (
  <SvgIconContainer {...props}>
    <Path
      d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2m18 0v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7m18 0-9 6-9-6"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIconContainer>
);

export const Mail = memo(Icon);
