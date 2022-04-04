import React from 'react';

import { Svg, Line } from 'react-native-svg';

export interface TicksProps {
  tickCount: number;
  width: number;
  height: number;
  strokeWidth: number;
  stroke: string;
}

function calculateTickGap(width: number, tickCount: number) {
  return width / (tickCount - 1);
}

export default function Ticks({
  tickCount: initialTickCount,
  width,
  strokeWidth,
  height,
  stroke,
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
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />,
    );
  }

  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      {ticks}
    </Svg>
  );
}
