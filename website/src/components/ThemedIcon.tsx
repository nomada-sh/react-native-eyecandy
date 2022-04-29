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
      height={48}
      width={48}
      sources={{
        light: useBaseUrl(`/img/icons/${name}.svg`),
        dark: useBaseUrl(`/img/icons/${name}-dark.svg`),
      }}
    />
  )
}