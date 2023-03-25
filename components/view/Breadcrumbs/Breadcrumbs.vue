<script lang="ts" setup>
import {useCurrentMap} from "~/composables";

const {mapName} = useCurrentMap()
let link = '';
const mapHistory = computed(() => {
  return mapName.split('/').map(history => {
    link += '/' + history;
    return {
      link,
      name: history,
    };
  });
})
</script>

<template>
  <div>
    <a href="/">Главная</a> /
    <template v-for="history in mapHistory">
      <a :href="history.link">
        {{ history.name }}
      </a> /
    </template>
  </div>
</template>
