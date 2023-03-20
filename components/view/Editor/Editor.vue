<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Nullable } from '~/entities/types/Nullable';
import { useCurrentMapRenderer } from "~/composables/useCurrentMapRenderer";

const canvasRef  = ref<Nullable<HTMLElement>>(null);
useCurrentMapRenderer(canvasRef);
</script>

<template>
  <div ref="canvasRef" id="canvas">editr</div>
</template>
