<script lang="ts" setup>
import { useMap, useOverlayAutoClose } from '~/composables'
import Nl2br from '~/components/utils/nl2br/nl2br'
import { SHOW_TEXT } from '~/constants'

const { map } = useMap()
useOverlayAutoClose(SHOW_TEXT)
</script>

<template>
  <article v-if="!map.isNothing" class="MapAsText">
    <div
      v-for="object in map.value.objects"
      :key="object.id"
      class="MapAsText-Item"
    >
      <h3 class="MapAsText-Title">{{ object.name }}</h3>
      <Nl2br tag="p" :text="object.description || ''" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
@import 'MapAsText';
</style>
