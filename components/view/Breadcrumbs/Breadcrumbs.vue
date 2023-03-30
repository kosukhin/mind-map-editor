<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { useCurrentMap } from '~/composables'

const { mapName, map } = useCurrentMap()
let link = ''
const mapHistory = computed(() => {
  const result: any = map.map((vMap) => {
    return mapName.split('/').map((history) => {
      link += '/' + history
      return {
        link,
        name: vMap?.parentNames?.[history] ?? history,
      }
    })
  })

  map.map((vMap) => {
    result[result.length - 1].name = vMap.settings.title
  })

  return result
})
</script>

<template>
  <div>
    <a href="/">Главная</a>
    <template v-for="history in mapHistory">
      /
      <a :href="history.link">
        {{ history.name }}
      </a>
    </template>
  </div>
</template>
