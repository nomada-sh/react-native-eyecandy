export default function wrap(m: number, n: number) {
  'worklet';
  return n >= 0 ? n % m : ((n % m) + m) % m;
}
