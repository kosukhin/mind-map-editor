<script lang="ts" setup>
import { reactive } from '@vue/reactivity'
import { useMiniMap } from '~/composables/useMiniMap'
import { Maybe } from '~/entities'

const miniMap = reactive(Maybe<HTMLDivElement>())
const miniMapScreen = reactive(Maybe<HTMLDivElement>())
const setMiniMap = (vMiniMap) => {
  miniMap.value = vMiniMap
}
const setMiniMapScreen = (vMiniMapScreen) => {
  miniMapScreen.value = vMiniMapScreen
}
useMiniMap(miniMap, miniMapScreen)
</script>

<template>
  <div class="MiniMap-Wrapper">
    <div :ref="setMiniMap" class="MiniMap"></div>
    <div :ref="setMiniMapScreen" class="MiniMap-Screen"></div>
  </div>
</template>

<style scoped lang="scss">
@import 'MiniMap';
</style>
