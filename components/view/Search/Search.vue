<script lang="ts" setup>
import {useCurrentMap, useLayer, useOverlay, useOverlayAutoClose} from "~/composables";
import {SHOW_SEARCH} from "~/constants";
import {computed, ref} from "@vue/reactivity";
import Input from '~/components/ui/Input/Input.vue';
import {allSet, MapObject} from "~/entities";

useOverlayAutoClose(SHOW_SEARCH);
const {stage, layerObjects} = useLayer();
const {map} = useCurrentMap();
const {close} = useOverlay();

const query = ref('');
const searchResults = computed(() => {
  return map.map(vMap => {
    if (query.value) {
      const objects = Object.values(vMap.objects);
      return objects.filter(object => {
        return object.name.toLowerCase().includes(query.value.toLowerCase());
      })
    }

    return []
  })
})

const moveToObject = (object: MapObject) => {
  close();
  stage.map(vStage => {
    const [img] = layerObjects.get(object.id);
    const x = img.x() * -1 + 200;
    const y = img.y() * -1 + 50;

    vStage.position({x, y})
  });
}
</script>

<template>
  <div class="Search">
    <Input class="Search-Input" v-model="query" placeholder="Введите запрос" />
    <div class="Search-Items" v-if="searchResults.length">
      <div @click="moveToObject(result)" class="Search-Item" v-for="result in searchResults">
        <b class="Search-ItemName">{{ result.name }}</b>
      </div>
    </div>
    <div v-else-if="query">
      Нет результатов
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "Search";
</style>
