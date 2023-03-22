import {useLayerEvents, useMapObjects} from "~/composables";
import {watch} from "@vue/runtime-core";
import { useDrawer } from "~/composables/useDrawer";

export const useLayerListenerClick = () => {
    const {click} = useLayerEvents();
    const {currentObjectId} = useMapObjects();
    const {drawer} = useDrawer();

    watch(click, () => {
        click.map((e) => {
            currentObjectId.value = e?.target.attrs.objectId
            drawer.value = 'showObject';
        })
    })
}