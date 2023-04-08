<script lang="ts" setup>
import { watch } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import Button from '~/components/ui/Button/Button'
import { useMap, useLayer, useMapObject, useLocks } from '~/composables'
import { updateObjectOnLayer, all } from '~/utils'

const { layer, layerObjects } = useLayer()
const { map } = useMap()
const { currentObjectId } = useMapObject()
const { isClickLocked } = useLocks()
const title = ref('Сделать связь')
const type = ref('default')

let stopNextObjectWatcher: Function | null = null

const startRelation = () => {
  if (type.value === 'danger') {
    if (stopNextObjectWatcher) {
      stopNextObjectWatcher()
    }

    title.value = 'Сделать связь'
    isClickLocked.value = false
    type.value = 'default'
    return
  }

  currentObjectId.value = null
  title.value = 'Выберите источник'
  isClickLocked.value = true
  type.value = 'danger'
  stopNextObjectWatcher = watch(currentObjectId, () => {
    if (!stopNextObjectWatcher) return
    stopNextObjectWatcher()
    title.value = 'Выберите цель'
    type.value = 'success'
    const fromObjectId = currentObjectId.map((objId) => objId).value as string

    const stopSecond = watch(currentObjectId, () => {
      stopSecond()
      const toObjectId = currentObjectId.map((objId) => objId).value as string
      title.value = 'Сделать связь'
      isClickLocked.value = false
      type.value = 'default'

      all([map, layer] as const).map(async ([vMap, vLayer]) => {
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
  <Button class="Linker" :type="type" @click="startRelation">
    {{ title }}
  </Button>
</template>

<style scoped lang="scss">
@import 'Linker';
</style>
