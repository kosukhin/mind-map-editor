<script setup lang="ts">
import {
  useMapTypes,
  useCurrentMap,
  useOverlay, useLayer
} from "~/composables";
import Button from '~/components/ui/Button/Button';
import {SHOW_TYPE} from "~/constants";
import {allSet, MapObject} from "~/entities";
import {addObjectToLayer} from "~/utils";

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
    const vType = vMap.types[type];
    const newObject: MapObject = {
      name: '',
      outlink: '',
      linked: false,
      targetBlank: false,
      arrows: [],
      description: '',
      id: Date.now().toString(),
      lastClick: Date.now(),
      position: [
        e.offsetX - 200,
        e.offsetY
      ],
      type,
      zindex: 0,
    }
    vMap.objects[newObject.id] = newObject;
    const objects = await addObjectToLayer(vLayer, newObject, vMap.types);
    layerObjects.set(newObject.id, objects);
  });
}
</script>

<template>
  <div class="SideBar">
    <div class="SideBar-Items" v-if="!map.isNothing">
      <div class="SideBar-Item" v-for="(type, name) in map.value.types">
        <div class="SideBar-ItemName">{{ name }}</div>
        <div
          class="SideBar-ItemImage"
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
