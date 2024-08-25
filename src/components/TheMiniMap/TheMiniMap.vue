<script lang="ts" setup>
const objects = [];
</script>

<template>
  <div class="absolute bg-white top-[50px] mt-3 right-3 z-1 w-30 h-30 border border-solid border-body-dark">
    <div ref="miniMap" class="TheMiniMap"></div>
    <div ref="miniMapScreen" class="absolute bg-primary/50"></div>
    <div v-if="objects">
      <div
        v-for="obj in objects"
        :key="obj.id"
        class="absolute w-1 h-1 block bg-danger"
      ></div>
    </div>
  </div>
</template>
