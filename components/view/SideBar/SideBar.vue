<script setup lang="ts">
import {
  useMapTypes,
  useCurrentMap,
  useOverlay, useLayer
} from "~/composables";
import Button from '~/components/ui/Button/Button';
import {SHOW_TYPE} from "~/constants";
import {allSet, MapObject} from "~/entities";
import { addObjectToLayer, createObject } from "~/utils";

const {map} = useCurrentMap();
const {layer, layerObjects} = useLayer();
const {currentTypeId} = useMapTypes();
const {overlayName} = useOverlay();

const selectType = (name: string) => {
  overlayName.value = SHOW_TYPE;
  currentTypeId.value = name;
}

const addToCanvas = (e: DragEvent, type: string) => {
  allSet([layer, map] as const).map(async ([vLayer, vMap]) => {
    const newObject: MapObject = createObject(
      [e.offsetX - 200, e.offsetY],
      type
    );
    vMap.objects[newObject.id] = newObject;
    const objects = await addObjectToLayer(vLayer, newObject, vMap.types);
    layerObjects.set(newObject.id, objects);
  });
}
</script>

<template>
  <div class="SideBar">
    <div class="SideBar-Items" v-if="!map.isNothing">
      <Button type="primary">Добавить тип</Button>
      <div class="SideBar-Item" v-for="(type, name) in map.value.types">
        <div class="SideBar-ItemName">{{ type.name }}</div>
        <div
          class="SideBar-ItemImage"
          title="Перетащите на канвас, чтобы добавить"
          draggable="true"
          v-html="type.svg"
          @dragend="addToCanvas($event, name)"
        ></div>
        <div class="SideBar-ItemButtons">
          <Button size="sm" @click="selectType(name)">A</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "SideBar";
</style>
