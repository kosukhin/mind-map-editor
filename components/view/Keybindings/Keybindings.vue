<script lang="ts" setup>
import { useOverlayAutoClose } from '~/composables'
import { SHOW_KEYBINDINGS } from '~/constants'

useOverlayAutoClose(SHOW_KEYBINDINGS)
</script>

<template>
  <pre class="Keybindings">
    Esc - закрывает модалку или дровер
    Ctrl+S - Сохраняет форму
  </pre>
</template>

<style scoped lang="scss">
@import 'Keybindings';
</style>
