<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Nullable } from '~/entities/types/Nullable';
import { useCurrentMapRenderer } from "~/composables/useCurrentMapRenderer";
import { useLayerEvents } from "~/composables/useLayerEvents";
import { watch } from "@vue/runtime-core";

const canvasRef  = ref<Nullable<HTMLElement>>(null);
useCurrentMapRenderer(canvasRef);
const {dragend, click} = useLayerEvents();

watch(dragend, () => {
  console.log(dragend.value?.target.attrs.objectId);
});
watch(click, () => {
  console.log(click.value);
});
</script>

<template>
  <div ref="canvasRef" id="canvas">editr</div>
</template>
