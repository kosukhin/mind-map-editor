import { Ref, watch } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import debounce from 'lodash/debounce';
import { useSharedLayerEvents } from '@/composables/useSharedLayerEvents';
import { useSharedMap } from '@/composables/useSharedMap';
import { useSharedSideBar } from '@/composables/useSharedSideBar';
import { useSharedMapObject } from '@/composables/useSharedMapObject';
import { useSharedOverlay } from '@/composables/useSharedOverlay';
import { useSharedLocks } from '@/composables/useSharedLocks';
import { mapObjectClick } from '@/application/mapObjectClick';
import { openUrlByObject } from '@/utils/map';

export const useSharedLayerListenerClick = createSharedComposable(() => {
  const { click, tap, stageClick } = useSharedLayerEvents();
  const { map } = useSharedMap();
  const { isSidebarOpen } = useSharedSideBar();
  const { currentObjectId, fastPreviewObjectId, fastPreviewIsLocked } = useSharedMapObject();
  const { overlayName } = useSharedOverlay();
  const { isClickLocked } = useSharedLocks();

  watch(stageClick, () => {
    isSidebarOpen.value = false;
    if (fastPreviewObjectId.value) {
      console.log('stage clicked');
      // eslint-disable-next-line no-unused-expressions
      stageClick.value && (stageClick.value.cancelBubble = true);
      fastPreviewObjectId.value = undefined;
    }
  });

  const onClick = (eventRef: Ref<any>) => {
    if (eventRef.value && map.value) {
      const result = mapObjectClick(isClickLocked.value)([
        eventRef.value,
        map.value,
      ]);
      if (result.currentObjectId && map.value) {
        if (map.value.objects[result.currentObjectId]) {
          map.value.objects[result.currentObjectId].lastClick = Date.now();
          map.value.position = map.value.objects[result.currentObjectId].position;
        }
      }
      if (result.openUrlByObject) {
        openUrlByObject(result.openUrlByObject);
        return;
      }
      if (
        result.currentObjectId
        && !result.openUrlByObject
        && map.value.objects[result.currentObjectId]
      ) {
        if (
          !fastPreviewIsLocked.value
          && (!fastPreviewObjectId.value
            || fastPreviewObjectId.value !== result.currentObjectId)) {
          // eslint-disable-next-line no-unused-expressions
          eventRef.value && (eventRef.value.cancelBubble = true);
          fastPreviewObjectId.value = result.currentObjectId;
          return;
        }
        // eslint-disable-next-line no-unused-expressions
        eventRef.value && (eventRef.value.cancelBubble = true);
        currentObjectId.value = result.currentObjectId ?? undefined;
        overlayName.value = result.overlayName ?? undefined;
        fastPreviewObjectId.value = undefined;
      }
    }
  };

  watch(
    click,
    debounce(() => {
      onClick(click);
    }, 200),
  );

  watch(tap, () => {
    onClick(tap);
  });

  return {
    onClick,
  };
});
