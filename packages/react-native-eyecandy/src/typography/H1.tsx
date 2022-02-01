import React from 'react';
import Heading, { HeadingProps } from './Heading';

export default function H1(props: HeadingProps) {
  return <Heading variant="h1" {...props} />;
}
