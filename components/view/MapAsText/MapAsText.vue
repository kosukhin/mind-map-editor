<script lang="ts" setup>
import { useCurrentMap } from "~/composables";
import {nl2br} from "~/utils";

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
      <div v-html="nl2br(object.description)"></div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@import "MapAsText";
</style>
