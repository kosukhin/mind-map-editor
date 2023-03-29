<script lang="ts" setup>
import {useCurrentMap, useOverlayAutoClose} from "~/composables";
import {SHOW_PARENT_TYPES} from "~/constants";
import Button from "~/components/ui/Button/Button.vue";
import {MapType} from "~/entities";

useOverlayAutoClose(SHOW_PARENT_TYPES);
const {map, parentTypes} = useCurrentMap();

const addType = (type: MapType) => {
  map.map(vMap => {
    vMap.types[type.name] = type;
  })
}
</script>

<template>
  <div class="ParentTypes">
    <div v-if="!parentTypes.length">Нет типов</div>
    <div class="ParentTypes-Items" v-else>
      <div class="ParentTypes-Item" :key="item.name" v-for="item in parentTypes">
        <div class="ParentTypes-ItemTitle">{{ item.name }}</div>
        <div class="ParentTypes-ItemImage" v-html="item.svg"></div>
        <Button @click="addType(item)" class="ParentTypes-ItemButton" type="success">Добавить на карту</Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "ParentTypes";
</style>
