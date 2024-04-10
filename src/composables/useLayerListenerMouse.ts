import { useLayer } from '@/composables/useLayer';
import { useLayerEvents } from '@/composables/useLayerEvents';
import { watch } from '@vue/runtime-core';
import { createSharedComposable } from '@vueuse/core';

export const useLayerListenerMouse = createSharedComposable(() => {
  const { stage } = useLayer();
  const { mouseenter, mouseleave } = useLayerEvents();

  watch(mouseenter, () => {
    if (stage.value && mouseenter.value) {
      if (
        mouseenter.value.target.attrs.image
      ) {
        stage.value.container().style.cursor = 'pointer';
      }
    }
  });

  watch(mouseleave, () => {
    if (stage.value && mouseleave.value) {
      stage.value.container().style.cursor = 'default';
    }
  });
});
