<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity'
import {
  useMap,
  useOverlay,
  useOverlayAutoClose,
  useMoveToObject,
} from '~/composables'
import { SHOW_SEARCH } from '~/constants'
import Input from '~/components/ui/Input/Input'
import { MapObject } from '~/entities'

useOverlayAutoClose(SHOW_SEARCH)
const { scrollToObject } = useMoveToObject()
const { map } = useMap()
const { close } = useOverlay()

const query = ref('')
const searchResults = computed(() => {
  return map.map((vMap) => {
    if (query.value) {
      const searchQuery = query.value.toLowerCase()
      const objects = Object.values(vMap.objects)
      return objects.filter((object) => {
        return (
          object.name.toLowerCase().includes(searchQuery) ||
          (object.additionalName &&
            object.additionalName.toLowerCase().includes(searchQuery))
        )
      })
    }

    return []
  }).value
})

const moveToObject = (object: MapObject) => {
  close()
  scrollToObject(object.id)
}
</script>

<template>
  <div class="Search">
    <Input
      v-model="query"
      autofocus
      class="Search-Input"
      placeholder="Введите запрос"
    />
    <div v-if="searchResults.length" class="Search-Items">
      <div
        v-for="result in searchResults"
        :key="result.name"
        class="Search-Item"
        @click="moveToObject(result)"
      >
        <b class="Search-ItemName">{{ result.name }}</b>
        <b v-if="result.additionalName" class="Search-ItemName">
          &nbsp;
          {{ result.additionalName }}
        </b>
      </div>
    </div>
    <div v-else-if="query">Нет результатов</div>
  </div>
</template>

<style scoped lang="scss">
@import 'Search';
</style>
