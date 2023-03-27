import {useCurrentMap, useLayerEvents, useMapObjects} from "~/composables";
import {watch} from "@vue/runtime-core";
import {useOverlay} from "~/composables/useOverlay";
import {SHOW_OBJECT} from "~/constants";
import {allSet} from "~/entities";
import {openUrlByObject} from "~/utils";
import {createSharedComposable} from "@vueuse/core";

export const useLayerListenerClick = createSharedComposable(() => {
  const {click} = useLayerEvents();
  const {map} = useCurrentMap();
  const {currentObjectId} = useMapObjects();
  const {overlayName} = useOverlay();
  const isLocked = ref(false);

  watch(click, () => {
    allSet([click, map] as const).map(([e, vMap]) => {
      const objectId = e?.target.attrs.objectId;

      if (e?.target.attrs.text && objectId) {
        const currentObject = vMap.objects[objectId]

        if (openUrlByObject(currentObject)) {
          return;
        }
      }

      currentObjectId.value = objectId;

      if (isLocked.value) {
        return;
      }

      overlayName.value = SHOW_OBJECT;
    })
  })

  return {
    isLocked,
  }
});
