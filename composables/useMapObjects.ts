import {useCurrentMap} from "~/composables/useCurrentMap";
import {computed, ComputedRef, reactive} from "@vue/reactivity";
import {allSet, MapObject, Maybe} from "~/entities";
import {createSharedComposable} from "@vueuse/core";

export const useMapObjects = createSharedComposable(() => {
  const {map} = useCurrentMap();
  const currentObjectId = reactive(Maybe<number>());
  const currentObject = computed(() =>
    allSet([map, currentObjectId] as const).map(([vMap, vObj]) => vMap.objects[vObj])
  ) as ComputedRef<MapObject>;
  const objects = computed(() =>
    map.map(vMap => vMap.objects)
  );

  return {
    currentObjectId,
    currentObject,
    objects
  };
});
