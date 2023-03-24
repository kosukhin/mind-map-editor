<script lang="ts" setup>
import {useMapTypes, useOverlay} from "~/composables";
import {watch} from "@vue/runtime-core";
import {SHOW_TYPE} from "~/constants";

const {currentType} = useMapTypes();
const {tryToClose, close} = useOverlay();

watch(tryToClose, () => {
  tryToClose.map(vClose => {
    if (vClose === SHOW_TYPE) {
      close();
    }
  })
})
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
