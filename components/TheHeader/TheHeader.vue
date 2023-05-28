<script setup lang="ts">
import { useCssVar } from '@vueuse/core'
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { normal } from 'color-blend'
import { useMap, useOverlay } from '~/composables'
import {
  SHOW_TEXT,
  SHOW_SEARCH,
  SHOW_OBJECT_MENU,
  SHOW_HISTORY_MAPS,
} from '~/constants'
import BaseIcon from '~/components/BaseIcon/BaseIcon.vue'
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs/BaseBreadcrumbs.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'

const { overlayName } = useOverlay()
const { firstMapLoad, map } = useMap()

const progressElement = ref(null)
const progress = useCssVar('--progress', progressElement)
const progressColor = useCssVar('--progressColor', progressElement)
watch(firstMapLoad, () => {
  map.map((vMap) => {
    const progressNumber = (vMap.progress < 100 ? vMap.progress : 100) / 100
    const progressRest = 1 - progressNumber
    progress.value = `${progressNumber * 100}%`
    const red = { r: 255, g: 0, b: 0, a: progressRest }
    const green = { r: 0, g: 255, b: 0, a: progressNumber }
    const color = normal(red, green)
    progressColor.value = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  })
})
</script>

<template>
  <div class="TheHeader">
    <div ref="progressElement" class="TheHeader-Background">
      <div class="TheHeader-Filled">Прогресс сегодня</div>
    </div>
    <BaseBreadcrumbs class="TheHeader-Breadcrumbs" />
    <div class="TheHeader-Actions">
      <BaseButton
        type="success"
        size="sm"
        title="Меню"
        @click="overlayName.value = SHOW_OBJECT_MENU"
      >
        <BaseIcon icon="fa-bars" />
      </BaseButton>
      <BaseButton
        title="Текстом"
        type="primary"
        size="sm"
        @click="overlayName.value = SHOW_TEXT"
      >
        <BaseIcon icon="fa-text-width" />
      </BaseButton>
      <BaseButton size="sm" @click="overlayName.value = SHOW_SEARCH">
        <BaseIcon icon="fa-search" />
      </BaseButton>
      <BaseButton
        size="sm"
        title="История посещений"
        @click="overlayName.value = SHOW_HISTORY_MAPS"
      >
        <BaseIcon icon="fa-history" />
      </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'TheHeader';
</style>
