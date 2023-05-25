<script lang="ts" setup>
import { useOverlayAutoClose } from '~/composables'
import { SHOW_KEYBINDINGS } from '~/constants'

useOverlayAutoClose(SHOW_KEYBINDINGS)
</script>

<template>
  <pre class="TheKeybindings">
    Esc - закрывает модалку или дровер
    Shift+<em>S</em> - Сохраняет форму
    Shift+<em>F</em> - Открывает окно поиска
    Shift+<em>M</em> - Открывает меню
  </pre>
</template>

<style scoped lang="scss">
@import 'TheKeybindings';
</style>
