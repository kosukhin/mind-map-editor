<script lang="ts" setup>
import {useMapTypes} from "~/composables";

const {currentType} = useMapTypes();
</script>

<template>
  <div>
    <div>width: {{ currentType.width }}</div>
    <div>height: {{ currentType.height }}</div>
    <div v-html="currentType.svg"></div>
  </div>
</template>

<style scoped lang="scss">
</style>
