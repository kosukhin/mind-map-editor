<script lang="ts" setup>
import {useMapTypes} from "~/composables";

const {currentType} = useMapTypes();
</script>

<template>
  <div v-if="!currentType.isNothing">
    <div>width: {{ currentType.value.width }}</div>
    <div>height: {{ currentType.value.height }}</div>
    <div v-html="currentType.value.svg"></div>
  </div>
</template>

<style scoped lang="scss">
</style>
