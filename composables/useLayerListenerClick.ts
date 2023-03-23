import {useLayerEvents, useMapObjects} from "~/composables";
import {watchEffect} from "@vue/runtime-core";
import {useOverlay} from "~/composables/useOverlay";
import {SHOW_OBJECT} from "~/constants";

export const useLayerListenerClick = () => {
  const {click} = useLayerEvents();
  const {currentObjectId} = useMapObjects();
  const {overlayName} = useOverlay();

  watchEffect(() => {
    click.map((e) => {
      currentObjectId.value = e?.target.attrs.objectId
      overlayName.value = SHOW_OBJECT;
    })
  })
}
