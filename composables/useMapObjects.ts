import {useCurrentMap} from "~/composables/useCurrentMap";
import {computed, reactive} from "@vue/reactivity";
import {allSet, Maybe} from "~/entities";
import {createSharedComposable} from "@vueuse/core";

export const useMapObjects = createSharedComposable(() => {
  const {map} = useCurrentMap();
  const currentObjectId = reactive(Maybe<number>());
  const currentObject = computed(() =>
    allSet([map, currentObjectId] as const).map(([vMap, vObj]) => vMap.objects[vObj])
  );
  const objects = computed(() =>
    map.map(vMap => vMap.objects)
  );

  return {
    currentObjectId,
    currentObject,
    objects
  };
});
