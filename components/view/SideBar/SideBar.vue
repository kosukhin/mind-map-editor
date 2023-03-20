<script setup lang="ts">
import { useCurrentMap } from "~/composables/useCurrentMap";

const {map} = useCurrentMap();
</script>

<template>
  <div class="SideBar">
    <div v-if="map">
      {{ map.types }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "SideBar";
</style>
