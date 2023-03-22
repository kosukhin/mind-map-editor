import { computed, reactive } from "@vue/reactivity";
import { Maybe } from "~/entities";
import { useCurrentMap } from "~/composables";
import { createSharedComposable } from "@vueuse/core";

type StrNum = string | number;

export const useMapTypes = createSharedComposable(() => {
  const { map } = useCurrentMap();
  const currentTypeId = reactive(Maybe<StrNum>());
  const currentType = computed(() =>
    map.map(vMap =>
      currentTypeId.map(vType =>
        vMap.types[vType]
      )
    )
  );
  const types = computed(() =>
    map.map(vMap =>
      vMap.types
    )
  );

  return {
    currentTypeId,
    currentType,
    types
  };
});