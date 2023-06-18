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
  transformer.shouldOverdrawWholeArea(true)
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

const cloneGroup = () => {
  all([map, layer] as const).map(([vMap, vLayer]) => {
    ;[...groups].forEach(async (objectId) => {
      const vObj = vMap.objects[objectId]
      await cloneObject(vObj, vMap, vLayer, layerObjects)
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
  <div v-if="isGrouping" key="grouper-panel" class="TheGrouper-Panel">
    <BaseButton type="primary" @click="cloneGroup">
      {{ $t('theGrouper.clone') }}
    </BaseButton>
  </div>
  <BaseButton :type="type" @click="onClick"> {{ title }} </BaseButton>
</template>
