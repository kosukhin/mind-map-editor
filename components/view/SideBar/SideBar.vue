<script setup lang="ts">
import { useCurrentMap } from "~/composables/useCurrentMap";
import {useMapObjects, useMapTypes} from "~/composables";
import Button from '@/components/ui/Button/Button';

const {map} = useCurrentMap();
const {currentTypeId, currentType} = useMapTypes();
const {currentObject} = useMapObjects();
</script>

<template>
  <div class="SideBar">
    <div class="SideBar-Items" v-if="map">
      <div class="SideBar-Item" v-for="(type, name) in map.types">
        <div class="SideBar-ItemName">{{ name }}</div>
        <div class="SideBar-ItemImage" v-html="type.svg"></div>
        <div class="SideBar-ItemButtons">
          <Button @click="currentTypeId = name">A</Button>
          <Button>B</Button>
          <Button>C</Button>
        </div>
      </div>

      <div>{{ currentType }}</div>
      <div>{{ currentObject }}</div>

    </div>
  </div>
</template>

<style scoped lang="scss">
@import "SideBar";
</style>
