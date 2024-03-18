import { createSharedComposable } from '@vueuse/core';
import { useCanvas, useLayerListeners, useSharedMap } from '@/composables';
import { CANVAS_DOM_ID } from '@/constants';
import { Layer, MapLayerObjects, Stage } from '@/entities';
import { findById, setValue } from '@/utils';
import { createLayer } from '@/utils/konva';
import { shallowRef } from 'vue';

export const useSharedLayer = createSharedComposable(() => {
  const { canvas } = useCanvas();
  const layer = shallowRef<Layer>();
  const stage = shallowRef<Stage>();
  const layerObjects: MapLayerObjects = new Map();
  const { firstMapLoad } = useSharedMap();

  setTimeout(() => {
    useLayerListeners();
  });

  const doCreateLayer = () => {
    setTimeout(() => {
      firstMapLoad.value = false;
      const wrapper = findById(CANVAS_DOM_ID);
      canvas.value = wrapper ?? undefined;

      if (wrapper) {
        const [newLayer, newStage] = createLayer(wrapper);
        setValue(layer, newLayer);
        setValue(stage, newStage);
      }

      setTimeout(() => {
        firstMapLoad.value = true;
      }, 100);
    }, 0);
  };

  return {
    layer,
    stage,
    layerObjects,
    createLayer: doCreateLayer,
  };
});
