<script setup lang="ts">
import Breadcrumbs from '@/components/view/Breadcrumbs/Breadcrumbs';
import Button from '@/components/ui/Button/Button';
import { useOverlay } from "~/composables";
import { SHOW_TEXT, SHOW_SEARCH } from "~/constants";
import { watch } from "@vue/runtime-core";

const {overlayName, tryToClose, close} = useOverlay();

watch(tryToClose, () => {
  tryToClose.map(vTry => {
    if (vTry === SHOW_TEXT) {
      close();
    }
  })
})
</script>

<template>
  <div class="Header">
    <Breadcrumbs class="Header-Breadcrumbs" />
    <div class="Header-Actions">
      <Button @click="overlayName.value=SHOW_TEXT" type="primary" size="sm">Текстом</Button>
      <Button @click="overlayName.value=SHOW_SEARCH" size="sm">Поиск</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "Header";
</style>
