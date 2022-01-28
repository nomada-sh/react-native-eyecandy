import { useRef } from 'react';
export default function useBottomSheet() {
  const ref = useRef(null);
  return {
    ref,
    open: () => {
      var _ref$current;

      return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.open();
    },
    close: () => {
      var _ref$current2;

      return (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.close();
    }
  };
}
//# sourceMappingURL=useBottomSheet.js.map