import {useCurrentMap, useLayerEvents, useMapObjects} from "~/composables";
import {watch} from "@vue/runtime-core";
import {useOverlay} from "~/composables/useOverlay";
import {SHOW_OBJECT} from "~/constants";
import {allSet} from "~/entities";
import {openUrlByObject} from "~/utils";

export const useLayerListenerClick = () => {
  const {click} = useLayerEvents();
  const {map} = useCurrentMap();
  const {currentObjectId} = useMapObjects();
  const {overlayName} = useOverlay();

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
      overlayName.value = SHOW_OBJECT;
    })
  })
}
