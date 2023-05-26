<script setup lang="ts">
import { useOverlay } from '~/composables'
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
</script>

<template>
  <div class="TheHeader">
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
