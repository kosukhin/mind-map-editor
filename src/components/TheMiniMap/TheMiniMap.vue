<script lang="ts" setup>
import { useMiniMap, useSharedMap } from '@/composables';
import { MINIMAP_SCALE } from '@/constants';

const { miniMap, miniMapScreen } = useMiniMap();
const { map } = useSharedMap();

const scaledPos = (pos: number) => `${(pos * MINIMAP_SCALE).toFixed(2)}px`;
</script>

<template>
  <div class="TheMiniMap-Wrapper">
    <div ref="miniMap" class="TheMiniMap"></div>
    <div ref="miniMapScreen" class="TheMiniMap-Screen"></div>
    <div v-if="map">
      <div
        v-for="obj in map.objects"
        :key="obj.id"
        class="TheMiniMap-Point"
        :style="{
          top: scaledPos(obj.position[1]),
          left: scaledPos(obj.position[0]),
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'TheMiniMap';
</style>
