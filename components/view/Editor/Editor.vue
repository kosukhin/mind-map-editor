<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { useEditor } from "~/composables/useEditor";
import { onMounted } from "@vue/runtime-core";
import { Nullable } from '~/entities/types/Nullable';

const canvasRef  = ref<Nullable<HTMLElement>>(null);
onMounted(() => {
  if (canvasRef.value) {
    useEditor(canvasRef.value)
  }
});
</script>

<template>
  <div ref="canvasRef">editr</div>
</template>
