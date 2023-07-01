<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity'
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
import { all, cloneObject } from '~/utils'

const { layer, layerObjects } = useSharedLayer()
const i18n = useI18n()
const title = ref(i18n.t('theGrouper.group'))
const type = ref('default')
const isGrouping = computed(() => type.value === 'danger')
const { map } = useSharedMap()
const { currentObjectId } = useSharedMapObject()
let stopNextObjectWatcher: Function | null = null
const { isClickLocked } = useSharedLocks()
const groups = new Set()
let transformer = new Konva.Group({})

function createSelection(nodes: any) {
  nodes.forEach((node) => {
    node.draggable(false)
    transformer.add(node)

    if (node instanceof Konva.Text) {
      node.fill('#f00')
    }
  })
}

function findNodes() {
  return flattenDeep(
    [...groups].map((objectId) => {
      return layerObjects.get(objectId)
    })
  )
}

const cloneGroup = () => {
  all([map, layer] as const).map(([vMap, vLayer]) => {
    ;[...groups].forEach(async (objectId) => {
      const vObj = vMap.objects[objectId]
      await cloneObject(vObj, vMap, vLayer, layerObjects)
    })
  })
}

const onClick = () => {
  transformer = new Konva.Group({
    draggable: true,
  })
  transformer.on('dragend', () => {
    const nodes = findNodes()
    map.map((vMap) => {
      nodes.forEach((node) => {
        if (node instanceof Konva.Image) {
          const object = vMap.objects[node.attrs.objectId]
          object.position = [
            node.x() + transformer.x(),
            node.y() + transformer.y(),
          ]
        }
      })
    })
  })
  layer.map((vLayer) => {
    vLayer.add(transformer)
  })

  if (stopNextObjectWatcher) {
    stopNextObjectWatcher()
    stopNextObjectWatcher = null
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

    const objects = findNodes()

    createSelection(objects)
    setTimeout(() => {
      currentObjectId.value = null
    })
  })
}
</script>

<template>
  <div v-if="isGrouping" key="grouper-panel" class="TheGrouper-Panel">
    <BaseButton type="primary" @click="cloneGroup">
      {{ $t('theGrouper.clone') }}
    </BaseButton>
  </div>
  <BaseButton :type="type" @click="onClick"> {{ title }} </BaseButton>
</template>
