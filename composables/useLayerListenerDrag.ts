import {useLayerEvents} from "~/composables/useLayerEvents";
import {watch} from "@vue/runtime-core";

export const useLayerListenerDrag = () => {
    const {dragend, dragstart} = useLayerEvents();

    watch(dragstart, () => {
        dragstart.map((e) => {
            console.log('dragstart', e);
        })
    });

    watch(dragend, () => {
        dragend.map((e) => {
            console.log('dragend', e);
        })
    });
}