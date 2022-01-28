import { useMemo } from 'react';
import { getRippleColor } from '../utils';
export default function useRippleColor(backgroundColor, lightRippleColor, darkRippleColor) {
  return useMemo(() => getRippleColor(backgroundColor, lightRippleColor, darkRippleColor), [backgroundColor, darkRippleColor, lightRippleColor]);
}
//# sourceMappingURL=useRippleColor.js.map