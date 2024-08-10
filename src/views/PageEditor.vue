<script setup lang="ts">
import { useApplication } from '@/composables/useApplication';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const canvas = ref<HTMLElement>();
const { mapFile } = useApplication();
const mapsCount = computed(() => Object.keys(mapFile.value ?? {}).length);
</script>

<template>
  <div>
    Всего карт в файле: {{  mapsCount }}
    <canvas ref="canvas"></canvas>
  </div>
</template>
