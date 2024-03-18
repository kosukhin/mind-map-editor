import { layerWheelHandler } from '@/application/layerWheelHandler';
import { useCanvasBoundaries } from '@/composables/useCanvasBoundaries';
import { useSharedLayer } from '@/composables/useSharedLayer';
import { useSharedLayerEvents } from '@/composables/useSharedLayerEvents';
import { watch } from '@vue/runtime-core';
import { createSharedComposable } from '@vueuse/core';

export const useLayerListenerWheel = createSharedComposable(() => {
  const { stage } = useSharedLayer();
  const { wheel } = useSharedLayerEvents();
  const { restrictBoundaries } = useCanvasBoundaries();

  watch(wheel, () => {
    if (stage.value && wheel.value) {
      const [vStage, vector] = layerWheelHandler([stage.value, wheel.value]);
      vStage.position(restrictBoundaries(vector));
    }
  });
});
