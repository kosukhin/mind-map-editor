import {useLayerEvents, useLayer} from "~/composables";
import {watchEffect} from "@vue/runtime-core";
import {allSet} from "~/entities";

export const useLayerListenerMouse = () => {
  const {stage} = useLayer();
  const {mouseenter, mouseleave} = useLayerEvents();

  watchEffect(() => {
    allSet([stage, mouseenter] as const).map(([vStage, e]) => {
      if (!e?.target) return;

      if (e.target.attrs.image || e.target.attrs.text) {
        vStage.container().style.cursor = 'pointer';
      }
    });
  });

  watchEffect(() => {
    allSet([stage, mouseleave] as const).map(([vStage, e]) => {
      if (!e?.target) return;

      vStage.container().style.cursor = 'default';
    });
  });
}
