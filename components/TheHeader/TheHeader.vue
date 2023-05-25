<script setup lang="ts">
import Breadcrumbs from '@/components/view/Breadcrumbs/Breadcrumbs'
import Button from '@/components/ui/Button/Button'
import { useOverlay } from '~/composables'
import { SHOW_TEXT, SHOW_SEARCH, SHOW_OBJECT_MENU } from '~/constants'
import BaseIcon from '~/components/BaseIcon/BaseIcon.vue'

const { overlayName } = useOverlay()
</script>

<template>
  <div class="Header">
    <Breadcrumbs class="Header-Breadcrumbs" />
    <div class="Header-Actions">
      <Button
        type="success"
        size="sm"
        title="Меню"
        @click="overlayName.value = SHOW_OBJECT_MENU"
      >
        <BaseIcon icon="fa-bars" />
      </Button>
      <Button
        title="Текстом"
        type="primary"
        size="sm"
        @click="overlayName.value = SHOW_TEXT"
      >
        <BaseIcon icon="fa-text-width" />
      </Button>
      <Button size="sm" @click="overlayName.value = SHOW_SEARCH">
        <BaseIcon icon="fa-search" />
      </Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'TheHeader';
</style>
