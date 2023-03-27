<script lang="ts" setup>
import {ref} from "@vue/reactivity";
import {useMiniMap} from "~/composables/useMiniMap";

const miniMap = ref<HTMLDivElement>();
useMiniMap(miniMap);
</script>

<template>
  <div ref="miniMap" class="MiniMap"></div>
</template>

<style scoped lang="scss">
@import "MiniMap";
</style>
