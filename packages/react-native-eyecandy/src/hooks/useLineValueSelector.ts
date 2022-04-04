import { useCallback, useMemo, useState } from 'react';

import { useSharedValue } from 'react-native-reanimated';

const MAX_TICKS_PER_SECOND = 100;

export interface UseLineValueSelectorOptions {
  min?: number;
  max?: number;
  increment?: number;
  initialValue?: number;
}

export default function useLineValueSelector(
  options: UseLineValueSelectorOptions = {},
) {
  const increment = options.increment !== undefined ? options.increment : 1;
  const initialValue =
    options.initialValue !== undefined ? options.initialValue : 0;
  const tick = useSharedValue(initialValue / increment);
  const [value, _setValue] = useState(initialValue);

  const minTick =
    options.min !== undefined ? options.min / increment : undefined;
  const maxTick =
    options.max !== undefined ? options.max / increment : undefined;

  const setValue = useCallback(
    newValue => {
      tick.value = newValue / increment;
      _setValue(newValue);
    },
    [increment, tick],
  );

  const props = useMemo(() => {
    const calculateValue = (t: number) => t * increment;

    const onActive = (t: number) => {
      _setValue(calculateValue(t));
    };

    const onDecay = (t: number, velocity: number) => {
      if (Math.abs(velocity) <= MAX_TICKS_PER_SECOND)
        _setValue(calculateValue(t));
    };

    return {
      tick,
      minTick,
      maxTick,
      onActive,
      onDecay,
    };
  }, [increment, maxTick, minTick, tick]);

  return {
    props,
    value,
    setValue,
  };
}
