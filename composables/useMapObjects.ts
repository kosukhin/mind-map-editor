import { useCurrentMap } from "~/composables/useCurrentMap";
import { computed } from "@vue/reactivity";
import { Maybe } from "~/entities";
import { createSharedComposable } from "@vueuse/core";

export const useMapObjects = createSharedComposable(() => {
  const { map } = useCurrentMap();
  const currentObjectId = reactive(Maybe<number>());
  const currentObject = computed(() =>
    map.map(vMap =>
      currentObjectId.map(vObj =>
        vMap.objects[vObj]
      )
    )
  );
  const objects = computed(() =>
    map.map(vMap =>
      vMap.objects
    )
  );

  return {
    currentObjectId,
    currentObject,
    objects
  };
});
