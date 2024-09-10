<script lang="ts" setup>
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';

const { miniMap } = useApplication();
const pointsPatron = new VueRefPatron();
miniMap.points(pointsPatron);
const points = pointsPatron.ref();

const sizePatron = new VueRefPatron();
miniMap.size(sizePatron);
const size = sizePatron.ref();

const viewportSizePatron = new VueRefPatron();
miniMap.viewportSize(viewportSizePatron);
const viewportSize = viewportSizePatron.ref();

const viewportPositionPatron = new VueRefPatron();
miniMap.viewportPosition(viewportPositionPatron);
const viewportPosition = viewportPositionPatron.ref();
</script>

<template>
  <div
    v-if="size"
    :style="{
        width: `${size.width}px`,
        height: `${size.height}px`,
      }"
    class="absolute block bg-white top-[50px] mt-3 right-3 z-1 border border-solid border-body-dark"
  >
    <div
      v-if="viewportPosition"
      :style="{
        width: `${viewportSize.width}px`,
        height: `${viewportSize.height}px`,
        top: `${viewportPosition.y}px`,
        left: `${viewportPosition.x}px`,
      }"
      class="absolute bg-primary/50"></div>
    <div v-if="points">
      <div
        v-for="obj in points"
        :key="obj.id"
        class="absolute w-1 h-1 block bg-danger"
        :style="{
          top: `${obj.y}px`,
          left: `${obj.x}px`,
        }"
      ></div>
    </div>
  </div>
</template>
