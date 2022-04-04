import React, { useRef } from 'react';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import AnimatedSelector, { AnimatedSelectorProps } from './AnimatedSelector';

export interface LineValueSelectorProps
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
}: LineValueSelectorProps) {
  const prevValueRef = useRef(value);
  const tickGap = calculateTickGap(ticksWidth, tickCount + 2);
  const x = (value / increment) * tickGap;
  const minX = min !== undefined ? (min / increment) * tickGap : undefined;
  const maxX = max !== undefined ? (max / increment) * tickGap : undefined;

  return (
    <AnimatedSelector
      x={x}
      onTranslate={newX => {
        const newValue = (newX / tickGap) * increment;
        onChange(newValue);

        if (prevValueRef.current !== newValue)
          ReactNativeHapticFeedback.trigger('impactLight');

        prevValueRef.current = newValue;
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
