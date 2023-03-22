import {useLayerEvents} from "~/composables/useLayerEvents";
import {watch} from "@vue/runtime-core";

export const useLayerListenerDrag = () => {
    const {dragend, dragstart} = useLayerEvents();

    watch(dragstart, () => {
        console.log('dragstart');
    });

    watch(dragend, (e) => {
        console.log('dragend', e?.target.attrs.objectId);
    });
}