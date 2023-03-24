import {
  useLayerListenerClick,
  useLayerListenerDrag,
  useLayerListenerMouse
} from "~/composables";

export const useLayerListeners = () => {
  useLayerListenerClick();
  useLayerListenerDrag();
  useLayerListenerMouse();
}
