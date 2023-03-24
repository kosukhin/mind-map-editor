import {useCurrentMap} from "~/composables/useCurrentMap";
import {reactive} from "@vue/reactivity";
import {allSet, MapObject, Maybe} from "~/entities";
import {createSharedComposable} from "@vueuse/core";
import {watch} from "@vue/runtime-core";

export const useMapObjects = createSharedComposable(() => {
  const {map} = useCurrentMap();
  const currentObjectId = reactive(Maybe<number>());
  const currentObject = reactive(Maybe<MapObject>());

  watch(currentObjectId, () => {
    allSet([currentObjectId, map] as const).map(([objId, vMap]) => {
      currentObject.value = vMap.objects[objId];
    })
  });

  return {
    currentObjectId,
    currentObject
  };
});
