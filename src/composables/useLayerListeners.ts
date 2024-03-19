import { useLayerListenerDrag } from '@/composables/useLayerListenerDrag';
import { useLayerListenerMouse } from '@/composables/useLayerListenerMouse';
import { useLayerListenerWheel } from '@/composables/useLayerListenerWheel';
import { useSharedLayerListenerClick } from '@/composables/useSharedLayerListenerClick';

export function useLayerListeners() {
  useSharedLayerListenerClick();
  useLayerListenerDrag();
  useLayerListenerMouse();
  useLayerListenerWheel();
}
