import React, { memo } from 'react';

import { Path } from 'react-native-svg';

import Icon, { IconProps } from './Icon';

const SvgComponent = (props: IconProps) => (
  <Icon {...props}>
    <Path
      d="M4 21V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H8l-4 4ZM8 9h8M8 13h6"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

const Message = memo(SvgComponent);
export default Message;
