<script lang="ts" setup>
import {SHOW_SETTINGS, SHOW_JSON, SHOW_PARENT_TYPES} from "~/constants";
import Button from "~/components/ui/Button/Button.vue";
import {useCurrentMap, useOverlay} from "~/composables";
import {removeMap} from "~/requests";
import Checkbox from "~/components/ui/Checkbox/Checkbox.vue";
import Input from "~/components/ui/Input/Input.vue";
import {computed, ref} from "@vue/reactivity";
import {watch} from "@vue/runtime-core";
import {MapSettings} from "~/entities";
import {useFormDirtyCheck} from "~/composables/useFormDirtyCheck";

const {map, mapName, firstMapLoad, parentTypes} = useCurrentMap();
const {close, overlayName} = useOverlay();
const form = ref({});
const {stringify} = JSON;
const isDirty = computed(() =>
  stringify(form.value) !== stringify(map.map(vMap => vMap.settings))
);
useFormDirtyCheck(isDirty, SHOW_SETTINGS);

watch(firstMapLoad, () => {
  map.map(vMap => {
    form.value = {...vMap.settings}
  })
}, {
  immediate: true,
})

const onRemove = async () => {
  if (confirm('Это действие безвозвратно удалит карту, продолжить?')) {
    await removeMap(mapName);
    location.href = '/';
  }
}

const onSave = () => {
  close();
  map.map(vMap => {
    vMap.settings = {...form.value} as MapSettings;
  })
}
</script>

<template>
  <div class="Settings">
    <div class="Settings-Content">
      <div class="Settings-Row">
        <div class="Settings-ButtonGroup">
          <Button @click="overlayName.value=SHOW_JSON" class="Settings-Button" type="primary">JSON экспорт\импорт</Button>
          <Button
            v-if="parentTypes.length"
            @click="overlayName.value=SHOW_PARENT_TYPES"
            type="primary"
            class="Settings-Button"
          >Родительские типы</Button>
        </div>
      </div>
      <div class="Settings-Row">
        <Checkbox v-model="form.colored" label="Использовать раскраску лейблов" />
      </div>
      <div class="Settings-Row">
        <label>
          <b>Название карты</b>
          <Input v-model="form.title" />
        </label>
      </div>
    </div>
    <div class="Settings-ButtonGroup">
      <Button class="Settings-Button" type="success" @click="onSave">Сохранить</Button>
      <Button class="Settings-Button" @click="close">Отменить</Button>
      <Button class="Settings-Button" type="danger" @click="onRemove">Удалить карту</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "Settings";
</style>
