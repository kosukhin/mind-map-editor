<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { useFactories } from '@/composables/useFactories';
import {
  MapObjectsWithTemplates,
} from '@/modules/application/l1/l2/l3/visibleObjects/MapObjectsWithTemplates';
import {
  MapObjectWithTemplateDocument,
} from '@/modules/application/l1/l2/l3/visibleObjects/MapObjectWithTemplateDocument';
import BaseNotify from '@/components/BaseNotify/BaseNotify.vue';

const {
  canvas, mapObjectsVisible, mapCurrent, konvaLayer,
} = useApplication();
const factories = useFactories();

const objectsWithTemplates = new MapObjectsWithTemplates(
  mapObjectsVisible,
  mapCurrent,
  factories,
);

const objects = objectsWithTemplates.objects(new VueRefPatron<MapObjectWithTemplateDocument[]>([])).ref();
const layerSize = konvaLayer.size(new VueRefPatron()).ref();
const layerPosition = konvaLayer.position(new VueRefPatron()).ref();

const canvasWrapper = ref();
onMounted((() => {
  canvas.receive(canvasWrapper.value);
}));
</script>

<template>
  <div class="relative">
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1">
      <div class="text-sm p-2 absolute bottom-0 left-0">
        Видимых объектов: {{ objects.length }}, FPS: 0,
        <BaseNotify />
      </div>
      <div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10">
        <div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0">
          <div class="w-[14px] h-[14px] bg-white"></div>
          <div class="w-[14px] h-[14px] bg-white"></div>
          <div class="w-[14px] h-[14px] bg-white"></div>
          <div class="w-[14px] h-[14px] bg-white"></div>
        </div>
      </div>
      <div :class="{'absolute top-0 left-0': true}" :style="{width: `${layerSize.width}px`, height: `${layerSize.height}px`, transform: `translate(${layerPosition.x}px, ${layerPosition.y}px)`}">
        <div
          v-for="obj in objects"
          :key="obj.obj.id"
          class="absolute"
          :style="`width:${obj.obj.width}px;height: ${obj.obj.height}px;top: ${obj.obj.position[1]}px;left:${obj.obj.position[0]}px;z-index:${obj.obj.zindex}`"
        >
          <div class="absolute bottom-[100%] text-nowrap left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm">
          <span
            v-html="obj.obj.additionalName"
            :class="[obj.obj.linked && 'cursor-pointer underline']"
          ></span>
          </div>
          <div class="absolute top-[100%] text-nowrap left-[50%] translate-x-[-50%] text-center pt-2 text-sm" v-html="obj.obj.name"></div>
          <div :data-object-id="obj.obj.id" class="rendered-object" v-html="obj.template"></div>
        </div>
      </div>
    </div>
    <div class="h-full" ref="canvasWrapper"></div>
  </div>
</template>
