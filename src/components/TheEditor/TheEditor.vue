<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMapRenderer, useSharedLayer } from '@/composables';
import { CANVAS_DOM_ID } from '@/constants';

useMapRenderer();
const counter = ref(0);

const { createLayer, layer, stage } = useSharedLayer();
onMounted(() => {
  if (layer.value) {
    layer.value.destroy();
  }

  if (stage.value) {
    stage.value.destroy();
  }

  createLayer();
});
</script>

<template>
  <div :id="CANVAS_DOM_ID" :key="'editor-canvas' + counter"></div>
</template>
