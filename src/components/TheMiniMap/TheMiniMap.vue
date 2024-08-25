<script lang="ts" setup>
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';

const { miniMapBehaviour } = useApplication();
const pointsPatron = new VueRefPatron();
miniMapBehaviour.points(pointsPatron);
const points = pointsPatron.ref();

const sizePatron = new VueRefPatron();
miniMapBehaviour.size(sizePatron);
const size = sizePatron.ref();
</script>

<template>
  <div
    :style="{
        width: `${size.width}px`,
        height: `${size.height}px`,
      }"
    class="absolute block bg-white top-[50px] mt-3 right-3 z-1 border border-solid border-body-dark"
  >
    <div ref="miniMap" class="TheMiniMap"></div>
    <div ref="miniMapScreen" class="absolute bg-primary/50"></div>
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
