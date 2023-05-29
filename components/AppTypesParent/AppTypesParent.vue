<script lang="ts" setup>
import svg64 from 'svg64'
import { useSharedMap, useOverlayAutoClose } from '~/composables'
import { SHOW_PARENT_TYPES } from '~/constants'
import { MapType } from '~/entities'
import BaseButton from '~/components/BaseButton/BaseButton.vue'

useOverlayAutoClose(SHOW_PARENT_TYPES)

const { map, parentTypes } = useSharedMap()
const addType = (type: MapType) => {
  map.map((vMap) => {
    vMap.types[type.name] = type
  })
}
</script>

<template>
  <div class="AppTypesParent">
    <div v-if="!parentTypes.length">Нет типов</div>
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
          Добавить на карту
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'AppTypesParent';
</style>
