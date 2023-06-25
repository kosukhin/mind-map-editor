<script lang="ts" setup>
import { watchOnce } from '@vueuse/core'
import { ref } from '@vue/reactivity'
import { SHOW_TRANSFER } from '~/constants'
import {
  useOverlayAutoClose,
  useSharedMap,
  useSharedMapObject,
} from '~/composables'
import BaseButton from '~/components/BaseButton/BaseButton.vue'
import { createMapObjectUrl } from '~/utils'
import { useRequestTransfer } from '~/composables/useRequestTransfer'

useOverlayAutoClose(SHOW_TRANSFER)
const { currentObject } = useSharedMapObject()
const { map, firstMapLoad } = useSharedMap()
const linkedObjects = ref([])

watchOnce(firstMapLoad, () => {
  map.map((vMap) => {
    linkedObjects.value = Object.values(vMap.objects).filter(
      (item) => item.linked
    )
  })
})

const getObjectLink = (object) => {
  if (object.outlink) {
    return object.outlink
  }

  return createMapObjectUrl(object)
}

const { transferMap } = useRequestTransfer()
const transfer = (toObj) => {
  transferMap(getObjectLink(toObj), {
    object: currentObject.value,
  })
}
</script>

<template>
  <BaseModal :name="SHOW_TRANSFER">
    <template #header>
      <h2>
        Перенести объект {{ currentObject.value.name }}
        {{ currentObject.value.additionalName }}
      </h2>
    </template>
    <ul class="TheObjectTransfer-Items">
      <li
        v-for="obj in linkedObjects"
        :key="obj.id"
        class="TheObjectTransfer-Item"
      >
        {{ obj.name }}
        {{ obj.additionalName ? `(${obj.additionalName})` : '' }}
        {{ getObjectLink(obj) }}
        <BaseButton
          class="TheObjectTransfer-Button"
          type="primary"
          size="sm"
          @click="transfer(obj)"
        >
          {{ $t('theObjectTransfer.transfer') }}
        </BaseButton>
      </li>
    </ul>
  </BaseModal>
</template>

<style lang="scss" scoped>
@import './TheObjectTransfer';
</style>
