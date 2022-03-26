import { useRef } from 'react';

import type { BottomSheetHandle } from '../components';

export default function useBottomSheet() {
  const ref = useRef<BottomSheetHandle>(null);

  return {
    ref,
    open: () => ref.current?.open(),
    close: () => ref.current?.close(),
  };
}
