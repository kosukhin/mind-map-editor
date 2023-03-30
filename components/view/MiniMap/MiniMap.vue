<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import { useMiniMap } from '~/composables/useMiniMap'

const miniMap = ref<HTMLDivElement>()
const miniMapScreen = ref<HTMLDivElement>()
useMiniMap(miniMap, miniMapScreen)
</script>

<template>
  <div class="MiniMap-Wrapper">
    <div ref="miniMap" class="MiniMap"></div>
    <div ref="miniMapScreen" class="MiniMap-Screen"></div>
  </div>
</template>

<style scoped lang="scss">
@import 'MiniMap';
</style>
