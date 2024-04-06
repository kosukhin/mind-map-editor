import { useLayerListenerDrag } from '@/composables/useLayerListenerDrag';
import { useLayerListenerMouse } from '@/composables/useLayerListenerMouse';
import { useLayerListenerWheel } from '@/composables/useLayerListenerWheel';
import { useLayerListenerClick } from '@/composables/useLayerListenerClick';

export function useLayerListeners() {
  useLayerListenerClick();
  useLayerListenerDrag();
  useLayerListenerMouse();
  useLayerListenerWheel();
}
