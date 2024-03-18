<script setup lang="ts">
import { useMapRenderer } from '@/composables/useMapRenderer';
import { useSharedLayer } from '@/composables/useSharedLayer';
import { CANVAS_DOM_ID } from '@/constants/system';
import { onMounted, ref } from 'vue';

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
