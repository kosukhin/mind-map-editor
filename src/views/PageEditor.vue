<script setup lang="ts">
import { ApplicationBase } from '@/objects/application/ApplicationBase';
import { onMounted, ref } from 'vue';

const canvas = ref<HTMLElement>();

onMounted(() => {
  new ApplicationBase(canvas.value).setup();
});
</script>

<template>
  <div>
    Show canvas
    <canvas ref="canvas"></canvas>
  </div>
</template>
