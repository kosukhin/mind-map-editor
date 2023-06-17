<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import { useI18n } from 'vue-i18n'
import { watch } from '@vue/runtime-core'
import Konva from 'konva'
import flattenDeep from 'lodash/flattenDeep'
import BaseButton from '~/components/BaseButton/BaseButton.vue'
import {
  useSharedLayer,
  useSharedLocks,
  useSharedMap,
  useSharedMapObject,
} from '~/composables'

const { layer, layerObjects } = useSharedLayer()
const i18n = useI18n()
const title = ref(i18n.t('theGrouper.group'))
const type = ref('default')
const { map } = useSharedMap()
const { currentObjectId } = useSharedMapObject()
let stopNextObjectWatcher: Function | null = null
const { isClickLocked } = useSharedLocks()
const groups = new Set()
let transformer = null

function createSelection(nodes: any) {
  if (transformer) {
    transformer.remove()
  }
  transformer = new Konva.Transformer({
    nodes,
    enabledAnchors: [],
  })
  transformer.rotateEnabled(false)
  layer.map((vLayer) => {
    vLayer.add(transformer)
  })

  transformer.on('dragend', () => {
    const nodes = transformer.nodes()

    map.map((vMap) => {
      nodes.forEach((node) => {
        if (node instanceof Konva.Image) {
          const object = vMap.objects[node.attrs.objectId]
          object.position = [node.x(), node.y()]
        }
      })
    })
  })
}

const onClick = () => {
  if (stopNextObjectWatcher) {
    if (transformer) {
      transformer.nodes([])
      transformer.detach()
      transformer.remove()
      transformer = null
    }
    stopNextObjectWatcher()
    isClickLocked.value = false
    title.value = i18n.t('theGrouper.group')
    type.value = 'default'
    groups.clear()
    return
  }

  title.value = 'Отменить'
  type.value = 'danger'
  isClickLocked.value = true
  currentObjectId.value = null
  stopNextObjectWatcher = watch(currentObjectId, () => {
    if (!currentObjectId.value) {
      return
    }

    if (groups.has(currentObjectId.value)) {
      groups.delete(currentObjectId.value)
    } else {
      groups.add(currentObjectId.value)
    }

    const objects = flattenDeep(
      [...groups].map((objectId) => {
        return layerObjects.get(objectId)
      })
    )

    createSelection(objects)
    setTimeout(() => {
      currentObjectId.value = null
    })
  })
}
</script>

<template>
  <BaseButton :type="type" @click="onClick"> {{ title }} </BaseButton>
</template>
