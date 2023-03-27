<script lang="ts" setup>
import {useOverlayAutoClose} from "~/composables/useOverlayAutoclose";
import {SHOW_SETTINGS} from "~/constants";
import Button from "~/components/ui/Button/Button.vue";

useOverlayAutoClose(SHOW_SETTINGS);
</script>

<template>
  <div class="Settings">
    <h2>Настройки карты</h2>
    <Button class="Settings-Button" type="danger">Удалить карту</Button>
  </div>
</template>

<style scoped lang="scss">
@import "Settings";
</style>
