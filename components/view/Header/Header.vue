<script setup lang="ts">
import Breadcrumbs from '@/components/view/Breadcrumbs/Breadcrumbs';
import Button from '@/components/ui/Button/Button';
import { useOverlay } from "~/composables";
import { SHOW_TEXT } from "~/constants";
import { watch } from "@vue/runtime-core";

const {overlayName, tryToClose, close} = useOverlay();

watch(tryToClose, () => {
  tryToClose.map(vTry => {
    if (vTry === SHOW_TEXT) {
      close();
    }
  })
})

const showText = () => {
  overlayName.value = SHOW_TEXT;
}

const removeMap = () => {
  if (confirm('Уверены что хотите удалить карту?')) {

  }
}
</script>

<template>
  <div class="Header">
    <Breadcrumbs class="Header-Breadcrumbs" />
    <div class="Header-Actions">
      <Button @click="showText" type="primary" size="sm">Текстом</Button>
      <Button @click="removeMap" type="danger" size="sm">Удалить</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "Header";
</style>
