<script setup lang="ts">
import {
  useMapObjects,
  useMapTypes,
  useCurrentMap,
  useDrawer
} from "~/composables";
import Button from '~/components/ui/Button/Button';
import Drawer from "~/components/ui/Drawer/Drawer.vue";

const {map} = useCurrentMap();
const {currentTypeId, currentType} = useMapTypes();
const {currentObject} = useMapObjects();
const {drawer} = useDrawer();

const selectType = (name: string) => {
  drawer.value = 'showType';
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
          <Button @click="selectType(name)">A</Button>
          <Button>B</Button>
          <Button>C</Button>
        </div>
      </div>
      <Drawer name="showType">
        {{ currentType }}
      </Drawer>
      <Drawer name="showObject">
        {{ currentObject }}
      </Drawer>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "SideBar";
</style>
