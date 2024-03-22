<script lang="ts" setup>
import svg64 from 'svg64';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import { useOverlayAutoClose } from '@/composables/useOverlayAutoclose';
import { SHOW_PARENT_TYPES } from '@/constants/overlays';
import { useSharedMap } from '@/composables/useSharedMap';
import { MapType } from '@/entities/Map';

useOverlayAutoClose(SHOW_PARENT_TYPES);

const { map, parentTypes } = useSharedMap();
const addType = (type: MapType) => {
  if (map.value) {
    map.value.types[type.name] = type;
  }
};
</script>

<template>
  <div class="AppTypesParent">
    <div v-if="!parentTypes.length">{{ $t('general.noTypes') }}</div>
    <div v-else class="AppTypesParent-Items">
      <div
        v-for="item in parentTypes"
        :key="item.name"
        class="AppTypesParent-Item"
      >
        <div class="AppTypesParent-ItemTitle">{{ item.name }}</div>
        <img class="AppTypesParent-ItemImage" :src="svg64(item.svg)" alt="" />
        <BaseButton
          class="AppTypesParent-ItemButton"
          type="success"
          @click="addType(item)"
        >
          {{ $t('general.addToMap') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'AppTypesParent';
</style>
