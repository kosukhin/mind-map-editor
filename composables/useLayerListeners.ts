import {
  useLayerListenerClick,
  useLayerListenerDrag,
  useLayerListenerMouse, useLayerListenerWheel
} from "~/composables";

export const useLayerListeners = () => {
  useLayerListenerClick();
  useLayerListenerDrag();
  useLayerListenerMouse();
  useLayerListenerWheel();
}
