<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { useMap } from '~/composables'

const { mapName, map } = useMap()

const mapHistory = computed(() => {
  let link = ''
  const result: any = map.map((vMap) => {
    return mapName.split('/').map((history) => {
      link += '/' + history
      return {
        link,
        name: vMap?.parentNames?.[history] ?? history,
      }
    })
  }).value

  map.map((vMap) => {
    result[result.length - 1].name = vMap.settings.title
  })

  return result
})
</script>

<template>
  <div>
    <a href="/">Главная</a>
    <span v-for="history in mapHistory" :key="history.name + history.link">
      /
      <a :href="history.link">
        {{ history.name }}
      </a>
    </span>
  </div>
</template>
