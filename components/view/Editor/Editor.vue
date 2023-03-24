<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Nullable } from '~/entities';
import {
  useCurrentMapRenderer,
  useLayer,
  useLayerListeners
} from "~/composables";
import {onMounted} from "@vue/runtime-core";
import {createLayer} from "~/utils";

const {layer, stage} = useLayer();
const canvasRef  = ref<Nullable<HTMLElement>>(null);
useCurrentMapRenderer();
useLayerListeners();

onMounted(() => {
  if (!canvasRef.value) return;
  const [newLayer, newStage] = createLayer(canvasRef.value);
  layer.value = newLayer;
  stage.value = newStage;
});
</script>

<template>
  <div ref="canvasRef" :key="'editor-canvas'" id="canvas"></div>
</template>
