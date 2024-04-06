import { layerWheelHandler } from '@/application/layerWheelHandler';
import { useCanvasBoundaries } from '@/composables/useCanvasBoundaries';
import { useLayer } from '@/composables/useLayer';
import { useLayerEvents } from '@/composables/useLayerEvents';
import { watch } from '@vue/runtime-core';
import { createSharedComposable } from '@vueuse/core';

export const useLayerListenerWheel = createSharedComposable(() => {
  const { stage } = useLayer();
  const { wheel } = useLayerEvents();
  const { restrictBoundaries } = useCanvasBoundaries();

  watch(wheel, () => {
    if (stage.value && wheel.value) {
      const [vStage, vector] = layerWheelHandler([stage.value, wheel.value]);
      vStage.position(restrictBoundaries(vector));
    }
  });
});
