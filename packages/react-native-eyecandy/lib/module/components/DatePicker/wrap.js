export default function wrap(m, n) {
  'worklet';

  return n >= 0 ? n % m : (n % m + m) % m;
}
//# sourceMappingURL=wrap.js.map