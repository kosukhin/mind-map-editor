<script lang="ts" setup>
import { useOverlayAutoClose } from '@/composables';
import { SHOW_KEYBINDINGS } from '@/constants';

useOverlayAutoClose(SHOW_KEYBINDINGS);
</script>

<template>
  <pre class="TheKeybindings">
    Esc - {{ $t('theKeybindings.closeModal') }}
    Ctrl+<em>S</em> - {{ $t('theKeybindings.saveForm') }}
    Ctrl+<em>F</em> - {{ $t('theKeybindings.openSearchWindow') }}
    Ctrl+<em>M</em> - {{ $t('theKeybindings.openMenu') }}
    Ctrl+<em>H</em> - {{ $t('theKeybindings.openTabsHistory') }}
  </pre>
</template>

<style scoped lang="scss">
@import 'TheKeybindings';
</style>
