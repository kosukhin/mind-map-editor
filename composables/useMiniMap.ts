import Konva from "konva";
import {Ref} from "@vue/reactivity";
import {onMounted, watch} from "@vue/runtime-core";
import {useCurrentMap, useLayer} from "~/composables";
import {allSet, MapLayer} from "~/entities";
import debounce from 'lodash/debounce';

const { Stage } = Konva;

export const useMiniMap = (
  miniMap: Ref<HTMLDivElement | undefined>,
  miniMapScreen: Ref<HTMLDivElement | undefined>,
) => {
  const {firstMapLoad} = useCurrentMap();
  const {layer, stage} = useLayer();
  let previewLayer: MapLayer | null = null;
  const scale = 0.09;

  const miniScreenWidth = window.innerWidth * scale;
  const miniScreenHeight = window.innerHeight * scale;

  onMounted(() => {
    if (miniMapScreen.value) {
      miniMapScreen.value.style.width = miniScreenWidth + 'px';
      miniMapScreen.value.style.height = miniScreenHeight + 'px';
    }
  })

  watch(firstMapLoad, () => {
    allSet([layer, stage] as const).map(([vLayer, vStage]) => {
      if (!miniMap.value) return;

      const previewStage = new Stage({
        container: miniMap.value,
        width: 150,
        height: 150,
        scaleX: scale,
        scaleY: scale,
      });

      const redrawPreviewLayer = debounce(() => {
        if (previewLayer) {
          previewLayer.destroy();
        }

        previewLayer = vLayer.clone({ listening: false });
        previewStage.add(previewLayer);
      }, 100);

      setTimeout(redrawPreviewLayer);

      vStage.on('dragmove', () => {
        redrawPreviewLayer();

        if(miniMapScreen.value) {
          const miniScreenX = vStage.x()*scale*-1;
          const miniScreenY = vStage.y()*scale*-1;
          miniMapScreen.value.style.top = miniScreenY + 'px';
          miniMapScreen.value.style.left = miniScreenX + 'px';
        }
      })
    })
  })
}
