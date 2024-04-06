import { useOverlay } from '@/composables/useOverlay';
import { watch } from '@vue/runtime-core';

export function useOverlayAutoClose(formName: string) {
  const { tryToClose, close } = useOverlay();
  watch(tryToClose, () => {
    if (tryToClose.value && tryToClose.value === formName) {
      close();
    }
  });
}
