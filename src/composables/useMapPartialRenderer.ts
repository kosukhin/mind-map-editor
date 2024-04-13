import { createSharedComposable } from '@vueuse/core';
import { renderVisibleMapObjects } from '@/application/renderVisibleMapObjects';
import { useLayer } from '@/composables/useLayer';
import { useMap } from '@/composables/useMap';
import { ref } from '@vue/reactivity';

export const useMapPartialRenderer = createSharedComposable(() => {
  const { layer, stage, layerObjects } = useLayer();
  const { map: sharedMap } = useMap();
  const partialRenderCounter = ref(0);

  const triggerPartialRendering = () => {
    if (stage.value && sharedMap.value && layer.value) {
      partialRenderCounter.value += 1;
      renderVisibleMapObjects(
        layerObjects,
        stage.value,
        sharedMap.value,
        layer.value,
      );
    }
  };

  return {
    triggerPartialRendering,
    partialRenderCounter,
  };
});
