<script setup lang="ts">
import { useLayerListeners } from '@/composables/useLayerListeners';
import { useMapRenderer } from '@/composables/useMapRenderer';
import { useLayer } from '@/composables/useLayer';
import { CANVAS_DOM_ID } from '@/constants/system';
import { onMounted, ref } from 'vue';

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
</script>

<template>
  <div :id="CANVAS_DOM_ID" :key="'editor-canvas' + counter"></div>
</template>
