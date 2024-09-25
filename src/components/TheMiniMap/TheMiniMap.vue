<script lang="ts" setup>
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { PointIdDocument } from '@/modules/application/l1/l2/l3/map/documents/PointIdDocument';

const { miniMap } = useApplication();

const points = miniMap.points(new VueRefPatron<(PointIdDocument & SizeDocument)[]>()).ref();
const size = miniMap.size(new VueRefPatron<SizeDocument>()).ref();
const viewportSize = miniMap.viewportSize(new VueRefPatron<SizeDocument>()).ref();
const viewportPosition = miniMap.viewportPosition(new VueRefPatron<PointDocument>()).ref();
</script>

<template>
  <div
    v-if="size"
    :style="{
        width: `${size.width}px`,
        height: `${size.height}px`,
      }"
    class="absolute block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
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
          width: `${obj.width}px`,
          height: `${obj.height}px`,
        }"
      ></div>
    </div>
  </div>
</template>
