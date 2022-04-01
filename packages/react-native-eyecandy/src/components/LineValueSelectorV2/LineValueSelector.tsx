import React from 'react';

import AnimatedSelector, { AnimatedSelectorProps } from './AnimatedSelector';

export interface LineValueSelectorV2Props
  extends Omit<AnimatedSelectorProps, 'x' | 'onTranslate'> {
  increment?: number;
  value: number;
  onChange: (value: number) => void;
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
  ...props
}: LineValueSelectorV2Props) {
  const tickGap = calculateTickGap(ticksWidth, tickCount + 2);
  const x = (value / increment) * tickGap;

  return (
    <AnimatedSelector
      x={x}
      onTranslate={newX => {
        const newValue = (newX / tickGap) * increment;
        onChange(newValue);
      }}
      tickCount={tickCount}
      ticksWidth={ticksWidth}
      {...props}
    />
  );
}

export default LineValueSelector;
