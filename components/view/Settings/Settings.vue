<script lang="ts" setup>
import {useOverlayAutoClose} from "~/composables/useOverlayAutoclose";
import {SHOW_SETTINGS} from "~/constants";

useOverlayAutoClose(SHOW_SETTINGS);
</script>

<template>
  <div>Настройки карты</div>
</template>

<style scoped lang="scss">
</style>
