<script lang="ts" setup>
import { useOverlayAutoClose } from '~/composables'
import { SHOW_KEYBINDINGS } from '~/constants'

useOverlayAutoClose(SHOW_KEYBINDINGS)
</script>

<template>
  <pre class="TheKeybindings">
    Esc - закрывает модалку или дровер
    Ctrl+<em>S</em> - Сохраняет форму
    Ctrl+<em>F</em> - Открывает окно поиска
    Ctrl+<em>M</em> - Открывает меню
    Ctrl+<em>H</em> - Открывает историю вкладок
  </pre>
</template>

<style scoped lang="scss">
@import 'TheKeybindings';
</style>
