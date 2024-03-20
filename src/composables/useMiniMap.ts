import { ref, watch } from 'vue';
import { createSharedComposable, watchOnce } from '@vueuse/core';
import debounce from 'lodash/debounce';
import { useSharedMap } from '@/composables/useSharedMap';
import { useSharedLayer } from '@/composables/useSharedLayer';
import { useCanvas } from '@/composables/useCanvas';
import { useSharedLayerEvents } from '@/composables/useSharedLayerEvents';
import { miniMapCalculateSizes } from '@/application/miniMapCalculateSizes';
import { miniMapRedrawHandler } from '@/application/miniMapRedrawHandler';
import { MINI_MAP_UPDATE_FREQ } from '@/constants/system';

export const useMiniMap = createSharedComposable(() => {
  const { firstMapLoad } = useSharedMap();
  const { layer, stage } = useSharedLayer();
  const { canvasSize } = useCanvas();
  const { dragmove, wheel } = useSharedLayerEvents();
  const miniMap = ref<HTMLElement>();
  const miniMapScreen = ref<HTMLElement>();

  const calculateMiniMapPosition = () => {
    if (
      layer.value
      && stage.value
      && miniMap
      && miniMapScreen.value
      && canvasSize.value
    ) {
      const { calculateMiniScreen } = miniMapRedrawHandler([
        stage.value,
        miniMapScreen.value,
      ]);
      const [vMiniMapScreen, miniScreenX, miniScreenY] = calculateMiniScreen();
      vMiniMapScreen.style.top = `${miniScreenY}px`;
      vMiniMapScreen.style.left = `${miniScreenX}px`;
    }
  };

  const calculateMiniMapSize = () => {
    if (canvasSize.value) {
      const [miniMapSizes, miniMapScreenSizes] = miniMapCalculateSizes([
        canvasSize.value,
      ]);

      if (miniMap.value && miniMapScreen.value) {
        miniMap.value.style.width = `${miniMapSizes.w}px`;
        miniMap.value.style.height = `${miniMapSizes.h}px`;
        miniMapScreen.value.style.width = `${miniMapScreenSizes.w}px`;
        miniMapScreen.value.style.height = `${miniMapScreenSizes.h}px`;
      }
    }
  };

  watchOnce(firstMapLoad, () => {
    setTimeout(() => {
      calculateMiniMapSize();
    });

    setTimeout(() => {
      calculateMiniMapPosition();
    }, 300);
  });

  watch(
    [dragmove, wheel],
    debounce(() => {
      if (dragmove.value || wheel.value) {
        calculateMiniMapPosition();
      }
    }, MINI_MAP_UPDATE_FREQ),
  );

  return {
    miniMap,
    miniMapScreen,
  };
});
