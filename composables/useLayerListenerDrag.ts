import {useLayerEvents} from "~/composables/useLayerEvents";
import {watchEffect} from "@vue/runtime-core";
import {useCurrentMap} from "~/composables/useCurrentMap";
import {allSet} from "~/entities";

export const useLayerListenerDrag = () => {
  const {map} = useCurrentMap();
  const {dragend} = useLayerEvents();

  watchEffect(() => {
    allSet([dragend, map] as const).map(([vDrag, vMap]) => {
      if (!vDrag?.target) return;
      const currentObject = vMap.objects[vDrag.target.attrs.objectId];
      currentObject.position[0] = vDrag.target.attrs.x;
      currentObject.position[1] = vDrag.target.attrs.y;
    })
  });
}
