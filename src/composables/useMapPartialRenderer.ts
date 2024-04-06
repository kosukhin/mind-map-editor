import { createSharedComposable } from '@vueuse/core';
import { renderVisibleMapObjects } from '@/application/renderVisibleMapObjects';
import { useLayer } from '@/composables/useLayer';
import { useMap } from '@/composables/useMap';

export const useMapPartialRenderer = createSharedComposable(() => {
  const { layer, stage, layerObjects } = useLayer();
  const { map: sharedMap } = useMap();

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
