<script setup lang="ts">
import Breadcrumbs from '@/components/view/Breadcrumbs/Breadcrumbs'
import Button from '@/components/ui/Button/Button'
import { useOverlay } from '~/composables'
import { SHOW_TEXT, SHOW_SEARCH } from '~/constants'

const { overlayName } = useOverlay()
</script>

<template>
  <div class="Header">
    <Breadcrumbs class="Header-Breadcrumbs" />
    <div class="Header-Actions">
      <Button type="primary" size="sm" @click="overlayName.value = SHOW_TEXT">
        Текстом
      </Button>
      <Button size="sm" @click="overlayName.value = SHOW_SEARCH">Поиск</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'Header';
</style>
