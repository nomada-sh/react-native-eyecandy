import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

export default function ThemedIcon({
  name
}: {
  name: string;
}) {
  return (
    <ThemedImage
      sources={{
        light: useBaseUrl(`/img/icons/${name}.svg`),
        dark: useBaseUrl(`/img/icons/${name}-dark.svg`),
      }}
    />
  )
}