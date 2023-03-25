<script lang="ts" setup>
import { useCurrentMap } from "~/composables";

const {map} = useCurrentMap();
</script>

<template>
  <article class="MapAsText" v-if="!map.isNothing">
    <div
      class="MapAsText-Item"
      :key="object.id"
      v-for="object in map.value.objects"
    >
      <h3 class="MapAsText-Title">{{ object.name }}</h3>
      <div>{{ object.description }}</div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@import "MapAsText";
</style>
