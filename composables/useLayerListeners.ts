import {useLayerListenerClick, useLayerListenerDrag} from "~/composables";

export const useLayerListeners = () => {
    useLayerListenerClick();
    useLayerListenerDrag();
}