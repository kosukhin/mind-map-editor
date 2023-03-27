import Konva from "konva";
import {Ref} from "@vue/reactivity";
import {watch} from "@vue/runtime-core";
import {useCurrentMap, useLayer} from "~/composables";
import {allSet, MapLayer} from "~/entities";
import debounce from 'lodash/debounce';

const { Stage } = Konva;

export const useMiniMap = (miniMapContainer: Ref<HTMLDivElement | undefined>) => {
  const {firstMapLoad} = useCurrentMap();
  const {layer, stage} = useLayer();
  let previewLayer: MapLayer | null = null;
  const scale = 0.09;

  watch(firstMapLoad, () => {
    allSet([layer, stage] as const).map(([vLayer, vStage]) => {
      if (!miniMapContainer.value) return;

      const previewStage = new Stage({
        container: miniMapContainer.value,
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
      })
    })
  })
}
