import {useLayerEvents} from "~/composables/useLayerEvents";
import {watchEffect} from "@vue/runtime-core";

export const useLayerListenerDrag = () => {
  const {dragend, dragstart} = useLayerEvents();

  watchEffect(() => {
    dragstart.map((e) => {
      console.log('dragstart', e);
    })
  });

  watchEffect(() => {
    dragend.map((e) => {
      console.log('dragend', e);
    })
  });
}
