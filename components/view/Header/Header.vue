<script setup lang="ts">
import Breadcrumbs from '@/components/view/Breadcrumbs/Breadcrumbs';
import Button from '@/components/ui/Button/Button';
</script>

<template>
  <div class="Header">
    <Breadcrumbs class="Header-Breadcrumbs" />
    <div class="Header-Actions">
      <Button>X</Button>
      <Button>Y</Button>
      <Button>Z</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "Header";
</style>
