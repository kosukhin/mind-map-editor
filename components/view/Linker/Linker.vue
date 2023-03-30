<script lang="ts" setup>
import { watch } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import Button from '~/components/ui/Button/Button'
import {
  useCurrentMap,
  useLayer,
  useLayerListenerClick,
  useMapObjects,
} from '~/composables'
import { updateObjectOnLayer } from '~/utils'
import { allSet } from '~/entities'

const { layer, layerObjects } = useLayer()
const { map } = useCurrentMap()
const { currentObjectId } = useMapObjects()
const { isLocked } = useLayerListenerClick()
const title = ref('Сделать связь')
const type = ref('default')

let stopNextObjectWatcher: Function | null = null

const startRelation = () => {
  if (type.value === 'danger') {
    if (stopNextObjectWatcher) {
      stopNextObjectWatcher()
    }

    title.value = 'Сделать связь'
    isLocked.value = false
    type.value = 'default'
    return
  }

  currentObjectId.value = null
  title.value = 'Выберите источник'
  isLocked.value = true
  type.value = 'danger'
  stopNextObjectWatcher = watch(currentObjectId, () => {
    if (!stopNextObjectWatcher) return
    stopNextObjectWatcher()
    title.value = 'Выберите цель'
    type.value = 'success'
    const fromObjectId = currentObjectId.map((objId) => objId) as string

    const stopSecond = watch(currentObjectId, () => {
      stopSecond()
      const toObjectId = currentObjectId.map((objId) => objId) as string
      title.value = 'Сделать связь'
      isLocked.value = false
      type.value = 'default'

      allSet([map, layer] as const).map(async ([vMap, vLayer]) => {
        vMap.objects[fromObjectId].arrows.push({ id: toObjectId })
        await updateObjectOnLayer(
          layerObjects,
          vLayer,
          vMap.objects[fromObjectId],
          vMap
        )
      })
    })
  })
}
</script>

<template>
  <Button class="Linker" :type="type" @click="startRelation">{{
    title
  }}</Button>
</template>

<style scoped lang="scss">
@import 'Linker';
</style>
