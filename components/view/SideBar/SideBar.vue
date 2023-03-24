<script setup lang="ts">
import {
  useMapTypes,
  useCurrentMap,
  useOverlay
} from "~/composables";
import Button from '~/components/ui/Button/Button';
import {SHOW_TYPE} from "~/constants";

const {map} = useCurrentMap();
const {currentTypeId} = useMapTypes();
const {overlayName} = useOverlay();

const selectType = (name: string) => {
  overlayName.value = SHOW_TYPE;
  currentTypeId.value = name;
}
</script>

<template>
  <div class="SideBar">
    <div class="SideBar-Items" v-if="!map.isNothing">
      <div class="SideBar-Item" v-for="(type, name) in map.value.types">
        <div class="SideBar-ItemName">{{ name }}</div>
        <div class="SideBar-ItemImage" v-html="type.svg"></div>
        <div class="SideBar-ItemButtons">
          <Button size="sm" @click="selectType(name)">A</Button>
          <Button size="sm">B</Button>
          <Button size="sm">C</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "SideBar";
</style>
