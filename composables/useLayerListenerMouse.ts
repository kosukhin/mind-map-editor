import {useLayerEvents, useLayer} from "~/composables";
import {watch} from "@vue/runtime-core";
import {allSet} from "~/entities";

export const useLayerListenerMouse = () => {
  const {stage} = useLayer();
  const {mouseenter, mouseleave} = useLayerEvents();

  watch(mouseenter, () => {
    allSet([stage, mouseenter] as const).map(([vStage, e]) => {
      if (!e?.target) return;

      if (e.target.attrs.image || e.target.attrs.text) {
        vStage.container().style.cursor = 'pointer';
      }
    });
  });

  watch(mouseleave, () => {
    allSet([stage, mouseleave] as const).map(([vStage, e]) => {
      if (!e?.target) return;

      vStage.container().style.cursor = 'default';
    });
  });
}
