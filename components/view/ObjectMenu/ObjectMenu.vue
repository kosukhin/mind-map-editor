<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import {
  useMap,
  useMoveToObject,
  useOverlay,
  useOverlayAutoClose,
} from '~/composables'
import { SHOW_OBJECT_MENU } from '~/constants'

useOverlayAutoClose(SHOW_OBJECT_MENU)
const { scrollToObject } = useMoveToObject()
const { firstMapLoad, map } = useMap()
const menuItems = ref([])
const { close } = useOverlay()

watch(
  firstMapLoad,
  () => {
    map.map((vMap) => {
      menuItems.value = Object.values(vMap.objects)
        .filter((object) => {
          return object.inMenu
        })
        .sort((a, b) => a.menuOrder - b.menuOrder)
    })
  },
  {
    immediate: true,
  }
)

const selectMenuItem = (id: string) => {
  scrollToObject(id)
  close()
}
</script>

<template>
  <div class="ObjectMenu">
    <div v-if="!menuItems.length" class="ObjectMenu-Empty">
      В меню нет пунктов, чтобы добавить объект в меню откройте дровер объекта и
      установите чекбокс "Использовать в меню".
    </div>
    <div v-else class="ObjectMenu-List">
      <a
        v-for="item in menuItems"
        :key="item.id"
        class="ObjectMenu-Item"
        href="#"
        @click.prevent="selectMenuItem(item.id)"
      >
        {{ item.name }}
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'ObjectMenu';
</style>
