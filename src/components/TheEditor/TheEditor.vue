<script setup lang="ts">
import { useLayerListeners } from '@/composables/useLayerListeners';
import { useMapRenderer } from '@/composables/useMapRenderer';
import { useLayer } from '@/composables/useLayer';
import { CANVAS_DOM_ID } from '@/constants/system';
import { onMounted, ref, watch } from 'vue';
import { useMap } from '@/composables/useMap';
import { calculateVisibleObjects } from '@/application/layerDragObjectHandler';
import { MapObject } from '@/entities/Map';
import { useLayerEvents } from '@/composables/useLayerEvents';
import { debounce } from 'lodash';
import { renderSvgTemplate } from '@/utils/svgRenderDefault';
import { useFps } from '@vueuse/core';

useMapRenderer();
const counter = ref(0);

const { createLayer, layer, stage } = useLayer();
onMounted(() => {
  if (layer.value) {
    layer.value.destroy();
  }

  if (stage.value) {
    stage.value.destroy();
  }

  createLayer(useLayerListeners);
});

const objectsRendered = ref<any>([]);
const { map } = useMap();
const { dragmove, wheel } = useLayerEvents();
watch([map, dragmove, wheel], () => {
  objectsRendered.value = [];

  if (!map.value || !stage.value) {
    return;
  }
  const vMap = map.value;
  const [visible] = calculateVisibleObjects(map.value, stage.value);
  const stagePosition = stage.value.position();

  objectsRendered.value = visible.map((obj: MapObject) => ({
    obj,
    viewPosition: stage.value?.position(),
    width: obj.width,
    height: obj.height,
    top: obj.position[1] + stagePosition.y,
    left: obj.position[0] + stagePosition.x,
    html: renderSvgTemplate(obj, vMap),
  }));
});
const fps = useFps();
</script>

<template>
  <div class="relative">
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1">
      <div class="text-sm p-2 absolute bottom-0 left-0">
        Видимых объектов: {{objectsRendered.length}}, FPS: {{ fps }}
      </div>
      <div
        v-for="obj in objectsRendered"
        :key="obj.obj.id"
        class="absolute"
        :style="`width:${obj.obj.width}px;height: ${obj.obj.height}px;top: ${obj.top}px;left:${obj.left}px`"
      >
        <div v-html="obj.html"></div>
      </div>
    </div>
    <div class="h-full" :id="CANVAS_DOM_ID" :key="'editor-canvas' + counter"></div>
  </div>
</template>
