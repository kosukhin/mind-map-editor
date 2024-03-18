import { createSharedComposable } from '@vueuse/core';
import { renderVisibleMapObjects } from '@/application/renderVisibleMapObjects';
import { useSharedLayer, useSharedMap } from '@/composables';

export const useMapPartialRenderer = createSharedComposable(() => {
  const { layer, stage, layerObjects } = useSharedLayer();
  const { map: sharedMap } = useSharedMap();

  const triggerPartialRendering = () => {
    if (stage.value && sharedMap.value && layer.value) {
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
  };
});
