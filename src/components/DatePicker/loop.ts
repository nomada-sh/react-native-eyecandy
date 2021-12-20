// TODO: use min and test
export default function loop(value: number, min: number, max: number): number {
  'worklet';
  if (value >= 0) {
    return value % max;
  } else {
    return loop(max + value, min, max);
  }
}
