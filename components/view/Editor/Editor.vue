<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Nullable } from '~/entities/types/Nullable';
import { useCurrentMapRenderer } from "~/composables/useCurrentMapRenderer";
import {onMounted} from "@vue/runtime-core";
import {createLayer} from "~/utils/konva/createLayer";
import {useLayer} from "~/composables/useLayer";

const {layer} = useLayer();
const canvasRef  = ref<Nullable<HTMLElement>>(null);
useCurrentMapRenderer(canvasRef);

onMounted(() => {
  if (!canvasRef.value) return;
  layer.value = createLayer(canvasRef.value);
});
</script>

<template>
  <div ref="canvasRef" id="canvas">editr</div>
</template>
