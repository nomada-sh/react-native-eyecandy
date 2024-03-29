import React, { memo } from 'react';

import { Path } from 'react-native-svg';

import { SvgIconContainer } from '../core';
import { SvgIconProps } from '../types';

const Icon = (props: SvgIconProps) => (
  <SvgIconContainer {...props}>
    <Path
      d="M10.33 16.593h-6.3M13.14 6.9h6.301"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      clipRule="evenodd"
      d="M8.726 6.846A2.355 2.355 0 0 0 6.363 4.5 2.355 2.355 0 0 0 4 6.846a2.355 2.355 0 0 0 2.363 2.347 2.355 2.355 0 0 0 2.363-2.347ZM20 16.554a2.354 2.354 0 0 0-2.362-2.346 2.355 2.355 0 0 0-2.364 2.346 2.355 2.355 0 0 0 2.364 2.346A2.354 2.354 0 0 0 20 16.554Z"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIconContainer>
);

export const Filter = memo(Icon);
