import React from 'react';
import Heading, { HeadingProps } from './Heading';

export default function H3(props: HeadingProps) {
  return <Heading variant="h3" {...props} />;
}
