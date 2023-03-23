<script setup lang="ts">
import {
  useMapObjects,
  useMapTypes,
  useCurrentMap,
  useOverlay
} from "~/composables";
import Button from '~/components/ui/Button/Button';
import Drawer from "~/components/ui/Drawer/Drawer.vue";
import Modal from "~/components/ui/Modal/Modal.vue";
import {SHOW_TYPE, SHOW_OBJECT} from "~/constants";

const {map} = useCurrentMap();
const {currentTypeId, currentType} = useMapTypes();
const {currentObject} = useMapObjects();
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
          <Button @click="selectType(name)">A</Button>
          <Button>B</Button>
          <Button>C</Button>
        </div>
      </div>
      <Modal :name="SHOW_TYPE">
        {{ currentType }}
      </Modal>
      <Drawer :name="SHOW_OBJECT">
        {{ currentObject }}
      </Drawer>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "SideBar";
</style>
