import React from 'react';

import AnimatedSelector, { AnimatedSelectorProps } from './AnimatedSelector';

export interface LineValueSelectorV2Props
  extends Omit<AnimatedSelectorProps, 'x' | 'onTranslate' | 'minX' | 'maxX'> {
  increment?: number;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
}

function calculateTickGap(width: number, tickCount: number) {
  return width / (tickCount - 1);
}

function LineValueSelector({
  increment = 1,
  value,
  onChange,
  tickCount = 3,
  ticksWidth = 80,
  min,
  max,
  ...props
}: LineValueSelectorV2Props) {
  const tickGap = calculateTickGap(ticksWidth, tickCount + 2);
  const x = (value / increment) * tickGap;
  const minX = min ? (min / increment) * tickGap : undefined;
  const maxX = max ? (max / increment) * tickGap : undefined;

  return (
    <AnimatedSelector
      x={x}
      onTranslate={newX => {
        const newValue = (newX / tickGap) * increment;
        onChange(newValue);
      }}
      tickCount={tickCount}
      ticksWidth={ticksWidth}
      maxX={maxX}
      minX={minX}
      {...props}
    />
  );
}

export default LineValueSelector;
