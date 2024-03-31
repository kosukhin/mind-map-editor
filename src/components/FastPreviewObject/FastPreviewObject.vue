<script lang="ts" setup>
import { useSharedMapObject } from '@/composables/useSharedMapObject';

const { fastPreviewObjectId } = useSharedMapObject();
</script>

<template>
  <div
    v-if="fastPreviewObjectId"
    class="FastPreviewObject"
  >
    preview fast {{fastPreviewObjectId}}
  </div>
</template>

<style lang="scss">
@import "FastPreviewObject";
</style>
