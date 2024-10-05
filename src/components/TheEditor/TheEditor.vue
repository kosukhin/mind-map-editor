<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
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
import {
  VueSource,
} from '@/modules/integration/vue/VueSource';
import {
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';

const {
  canvas,
  mapObjectsVisible,
  mapCurrent,
  konvaLayer,
  fps,
  mapCurrentID,
  mapObjectUrl,
  stageSize,
} = useApplication();
const factories = useFactories();

const fpsValue = fps.value(new VueRefPatron()).ref();

const objectsWithTemplates = new MapObjectsWithTemplates(
  mapObjectsVisible,
  mapCurrent,
  factories,
);

const objects = objectsWithTemplates.objects(new VueRefPatron<MapObjectWithTemplateDocument[]>([])).ref();
const layerSize = stageSize.receiving(new VueRefPatron<SizeDocument>()).ref();
const layerPosition = konvaLayer.position(new VueRefPatron<PointDocument>()).ref();

const layerWidth = computed(() => layerSize.value?.width);
const layerWidthSource = new VueSource(layerWidth);
const chunks = factories.numberChunks.create(10, layerWidthSource).chunks(new VueRefPatron()).ref();

const canvasWrapper = ref();
onMounted((() => {
  canvas.receive(canvasWrapper.value);
}));

const onObjectClick = (object: MapObjectDocument) => {
  mapObjectUrl.open(object, factories.guest.create((name: string) => {
    mapCurrentID.receive(name);
  }));
};
</script>

<template>
  <div class="relative">
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1">
      <div class="text-sm z-10 p-2 absolute bottom-0 left-5">
        Видимых объектов: {{ objects.length }}, FPS: {{ fpsValue }},
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
      <div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>
      <div :class="{'objects-container absolute top-0 left-0': true}" :style="{width: `${layerSize.width}px`, height: `${layerSize.height}px`, transform: `translate(${layerPosition.x}px, ${layerPosition.y}px)`}">
        <div class="absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2" :style="{transform: `translate(0, ${-layerPosition.y}px)`}">
          <span class="flex-1 text-body-dark" :key="`horiz_${chunk}`" v-for="chunk in chunks">{{chunk}}px</span>
        </div>
        <div class="absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2" :style="{transform: `translate(${-layerPosition.x}px, 0)`}">
          <span class="flex-1 rotate-180 text-body-dark" :key="`vert_${chunk}`" v-for="chunk in chunks">{{chunk}}px</span>
        </div>
        <div
          v-for="obj in objects"
          :key="obj.obj.id"
          class="absolute z-10"
          :data-object-id="obj.obj.id"
          :style="`width:${obj.obj.width}px;height: ${obj.obj.height}px;top: ${obj.obj.position[1]}px;left:${obj.obj.position[0]}px;z-index:${obj.obj.zindex}`"
        >
          <div class="absolute bottom-[100%] text-nowrap left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm">
          <span
            v-html="obj.obj.additionalName"
            :class="[obj.obj.linked && 'cursor-pointer underline']"
            @click="onObjectClick(obj.obj)"
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
