<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Nullable } from '~/entities';
import {useCurrentMapRenderer, useLayer, useLayerListeners} from "~/composables";
import {onMounted} from "@vue/runtime-core";
import {createLayer} from "~/utils";

const {layer} = useLayer();
const canvasRef  = ref<Nullable<HTMLElement>>(null);
useCurrentMapRenderer();
useLayerListeners();

onMounted(() => {
  if (!canvasRef.value) return;
  layer.value = createLayer(canvasRef.value);
});
</script>

<template>
  <div ref="canvasRef" id="canvas"></div>
</template>
