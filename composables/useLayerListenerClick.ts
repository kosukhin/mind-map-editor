import {useLayerEvents, useMapObjects} from "~/composables";
import {watch} from "@vue/runtime-core";

export const useLayerListenerClick = () => {
    const {click} = useLayerEvents();
    const {currentObjectId} = useMapObjects();

    watch(click, (e) => {
        currentObjectId.value = e?.target.attrs.objectId
    })
}