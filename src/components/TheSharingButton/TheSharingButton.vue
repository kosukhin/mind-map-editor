<script setup lang="ts">
import { useService } from '@/composables/useService';
import { useSharing } from '@/composables/useSharing';
import { VueRefPatron } from '../../../patron-scheme-editor/src/modules/integration/vue/VueRefPatron';

const { sharedFile } = useSharing();

const { sharingStorageChanged } = useService();
const sharingStorageChangedPatron = new VueRefPatron();
sharingStorageChanged.value(sharingStorageChangedPatron);
</script>

<template>
  <div
    :class="{changed: sharingStorageChangedPatron.value}"
    class="absolute bg-body hover:bg-border cursor-pointer border-solid border-border bottom-[150px] z-10 right-[60px] p-3 w-15 h-15"
    style="right: 60px"
    @click="sharedFile.do()"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/></svg>
  </div>
</template>

<style scoped>
  .changed {
    background: orange;
  }
</style>
