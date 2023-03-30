<script lang="ts" setup>
import { useCurrentMap } from '~/composables'
import { nl2br } from '~/utils'

const { map } = useCurrentMap()
</script>

<template>
  <article v-if="!map.isNothing" class="MapAsText">
    <div
      v-for="object in map.value.objects"
      :key="object.id"
      class="MapAsText-Item"
    >
      <h3 class="MapAsText-Title">{{ object.name }}</h3>
      <div v-html="nl2br(object.description)"></div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@import 'MapAsText';
</style>
