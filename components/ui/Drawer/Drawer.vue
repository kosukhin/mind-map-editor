<script setup lang="ts">

const isOpened = ref(false);
</script>

<template>
  <div class="Drawer" v-if="isOpened">
    <div class="Drawer-Inner">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "Drawer";
</style>