import { useSharedOverlay } from '@/composables/useSharedOverlay';
import { watch } from '@vue/runtime-core';

export function useOverlayAutoClose(formName: string) {
  const { tryToClose, close } = useSharedOverlay();
  watch(tryToClose, () => {
    if (tryToClose.value && tryToClose.value === formName) {
      close();
    }
  });
}
