<script setup lang="ts">
import { useCurrentMap } from "~/composables/useCurrentMap";

const {map} = useCurrentMap();
</script>

<template>
  <div class="SideBar">
    <div class="SideBar-Items" v-if="map">
      <div class="SideBar-Item" v-for="(type, name) in map.types">
        <div class="SideBar-ItemName">{{ name }}</div>
        <div class="SideBar-ItemImage" v-html="type.svg"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "SideBar";
</style>
