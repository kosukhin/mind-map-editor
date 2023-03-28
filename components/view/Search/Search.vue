<script lang="ts" setup>
import {useOverlayAutoClose} from "~/composables";
import {SHOW_SEARCH} from "~/constants";

useOverlayAutoClose(SHOW_SEARCH);
</script>

<template>
  <div class="Search">
    <h2 class="Search-Title">Поиск по карте</h2>
  </div>
</template>

<style scoped lang="scss">
@import "Search";
</style>
