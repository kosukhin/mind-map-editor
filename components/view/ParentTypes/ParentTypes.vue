<script lang="ts" setup>
import { useCurrentMap, useOverlayAutoClose } from '~/composables'
import { SHOW_PARENT_TYPES } from '~/constants'
import Button from '~/components/ui/Button/Button.vue'
import { MapType } from '~/entities'

useOverlayAutoClose(SHOW_PARENT_TYPES)
const { map, parentTypes } = useCurrentMap()

const addType = (type: MapType) => {
  map.map((vMap) => {
    vMap.types[type.name] = type
  })
}
</script>

<template>
  <div class="ParentTypes">
    <div v-if="!parentTypes.length">Нет типов</div>
    <div v-else class="ParentTypes-Items">
      <div
        v-for="item in parentTypes"
        :key="item.name"
        class="ParentTypes-Item"
      >
        <div class="ParentTypes-ItemTitle">{{ item.name }}</div>
        <div class="ParentTypes-ItemImage" v-html="item.svg"></div>
        <Button
          class="ParentTypes-ItemButton"
          type="success"
          @click="addType(item)"
          >Добавить на карту</Button
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'ParentTypes';
</style>
