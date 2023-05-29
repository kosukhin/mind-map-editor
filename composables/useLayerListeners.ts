import {
  useSharedLayerListenerClick,
  useLayerListenerDrag,
  useLayerListenerMouse,
  useLayerListenerWheel,
} from '~/composables'

export function useLayerListeners() {
  useSharedLayerListenerClick()
  useLayerListenerDrag()
  useLayerListenerMouse()
  useLayerListenerWheel()
}
