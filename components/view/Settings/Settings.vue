<script lang="ts" setup>
import {useOverlayAutoClose} from "~/composables/useOverlayAutoclose";
import {SHOW_SETTINGS} from "~/constants";
import Button from "~/components/ui/Button/Button.vue";
import {useCurrentMap} from "~/composables";
import {removeMap} from "~/requests";

useOverlayAutoClose(SHOW_SETTINGS);
const {map, mapName} = useCurrentMap();

const onRemove = async () => {
  if (confirm('Это действие безвозвратно удалит карту, продолжить?')) {
    await removeMap(mapName);
    location.reload();
  }
}
</script>

<template>
  <div class="Settings">
    <h2>Настройки карты</h2>
    <div class="Settings-ButtonGroup">
      <Button class="Settings-Button" type="success">Сохранить</Button>
      <Button class="Settings-Button" type="danger" @click="onRemove">Удалить карту</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "Settings";
</style>
