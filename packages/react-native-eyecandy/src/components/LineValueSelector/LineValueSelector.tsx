import React from 'react';
import { View } from 'react-native';

import { Svg, Line } from 'react-native-svg';

export interface LineValueSelectorProps {
  tickCount?: number;
  width?: number;
  height?: number;
  ticksWidth?: number;
  strokeWidth?: number;
}

interface TicksProps {
  tickCount: number;
  width: number;
  height: number;
  strokeWidth: number;
}

function calculateTickGap(width: number, tickCount: number) {
  return width / (tickCount - 1);
}

function Ticks({
  tickCount: initialTickCount,
  width,
  strokeWidth,
  height,
}: TicksProps) {
  const tickCount = initialTickCount + 2;
  const tickGap = calculateTickGap(width, tickCount);
  const viewBox = `0 0 ${width} ${height}`;

  const ticks: React.ReactNode[] = [];
  for (let i = 0; i < tickCount - 1; i++) {
    const x = tickGap * i;
    let yPadding = i === 0 ? 0 : 5;

    ticks.push(
      <Line
        key={i}
        x1={x}
        y1={yPadding}
        x2={x}
        y2={height - yPadding}
        stroke="white"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />,
    );
  }

  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox}
      style={{
        backgroundColor: 'green',
      }}
    >
      {ticks}
    </Svg>
  );
}

function LineValueSelector({
  tickCount = 3,
  width = 80,
  height = 15,
  strokeWidth = 1,
}: LineValueSelectorProps) {
  return (
    <View
      style={{
        height: height * 3,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Ticks
          strokeWidth={strokeWidth}
          tickCount={tickCount}
          width={width}
          height={height}
        />
        <Ticks
          strokeWidth={strokeWidth}
          tickCount={tickCount}
          width={width}
          height={height}
        />
        <Ticks
          strokeWidth={strokeWidth}
          tickCount={tickCount}
          width={width}
          height={height}
        />
        <Ticks
          strokeWidth={strokeWidth}
          tickCount={tickCount}
          width={width}
          height={height}
        />
      </View>
    </View>
  );
}

export default LineValueSelector;
