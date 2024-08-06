<script setup lang="ts">
import { useApplication } from '@/composables/useApplication';
import { ref } from 'vue';

const canvas = ref<HTMLElement>();
const { mapFile } = useApplication();
</script>

<template>
  <div>
    Show canvas
    <canvas ref="canvas"></canvas>
  </div>
</template>
