/// <reference types="react" />
import type { BottomSheetHandle } from '../components';
export default function useBottomSheet(): {
    ref: import("react").RefObject<BottomSheetHandle>;
    open: () => void | undefined;
    close: () => void | undefined;
};
