<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity'
import {
  useMap,
  useLayer,
  useOverlay,
  useOverlayAutoClose,
} from '~/composables'
import { SHOW_SEARCH } from '~/constants'
import Input from '~/components/ui/Input/Input'
import { MapObject } from '~/entities'

useOverlayAutoClose(SHOW_SEARCH)
const { stage, layerObjects } = useLayer()
const { map } = useMap()
const { close } = useOverlay()

const query = ref('')
const searchResults = computed(() => {
  return map.map((vMap) => {
    if (query.value) {
      const objects = Object.values(vMap.objects)
      return objects.filter((object) => {
        return object.name.toLowerCase().includes(query.value.toLowerCase())
      })
    }

    return []
  }).value
})

const moveToObject = (object: MapObject) => {
  close()
  stage.map((vStage) => {
    const [img] = layerObjects.get(object.id)
    const x = img.x() * -1 + 200
    const y = img.y() * -1 + 50

    vStage.position({ x, y })
  })
}
</script>

<template>
  <div class="Search">
    <Input v-model="query" class="Search-Input" placeholder="Введите запрос" />
    <div v-if="searchResults.length" class="Search-Items">
      <div
        v-for="result in searchResults"
        :key="result.name"
        class="Search-Item"
        @click="moveToObject(result)"
      >
        <b class="Search-ItemName">{{ result.name }}</b>
      </div>
    </div>
    <div v-else-if="query">Нет результатов</div>
  </div>
</template>

<style scoped lang="scss">
@import 'Search';
</style>
