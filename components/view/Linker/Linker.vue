<script lang="ts" setup>
import Button from "~/components/ui/Button/Button.vue";
import {useCurrentMap, useLayer, useLayerListenerClick, useMapObjects} from "~/composables";
import {watch} from "@vue/runtime-core";
import {ref} from "@vue/reactivity";
import {updateObjectOnLayer} from "~/utils";
import {allSet} from "~/entities";

const {layer, layerObjects} = useLayer();
const {map} = useCurrentMap();
const {currentObjectId} = useMapObjects();
const {isLocked} = useLayerListenerClick();
const title = ref('Сделать связь');
const type = ref('default');

const startRelation = () => {
  currentObjectId.value = null;
  title.value = 'Выберите источник';
  isLocked.value = true;
  type.value = 'danger';

  const stopFirst = watch(currentObjectId, () => {
    stopFirst();
    title.value = 'Выберите цель';
    const fromObjectId = currentObjectId.map(objId => objId) as string;

    const stopSecond = watch(currentObjectId, () => {
      stopSecond();
      const toObjectId = currentObjectId.map(objId => objId) as string;
      console.log('from', fromObjectId, 'to', toObjectId);
      title.value = 'Сделать связь';
      isLocked.value = false;
      type.value = 'default';

      allSet([map, layer] as const).map(async ([vMap, vLayer]) => {
        vMap.objects[fromObjectId].arrows.push({id: toObjectId});
        await updateObjectOnLayer(layerObjects, vLayer, vMap.objects[fromObjectId], vMap);
      })
    });
  })
}
</script>

<template>
  <Button class="Linker" :type="type" @click="startRelation">{{ title }}</Button>
</template>

<style scoped lang="scss">
@import "Linker";
</style>
