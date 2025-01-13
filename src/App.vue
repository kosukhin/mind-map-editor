<script setup lang="ts">
import { ref, watch } from 'vue';
import { useService } from '@/composables/useService';
import PageNoContent from '@/views/PageNoContent.vue';
import { PatronSchemeEditor, VueRefPatron, useFactories } from 'patron-scheme-editor';
import 'patron-scheme-editor/patron-scheme-editor.css';
import TheSharingButton from '@/components/TheSharingButton/TheSharingButton.vue';
import { useSharing } from '@/composables/useSharing';
import presets from '../public/data/presets.json';

const { serviceFileContent } = useService();

const canBeUsed = serviceFileContent.canBeUsed(new VueRefPatron()).ref();

const { patron } = useFactories();

const patronContentRef = ref();
serviceFileContent.content(patron.create((content: boolean) => {
  patronContentRef.value = content;
}));

watch(patronContentRef, (patronContentValue: string) => {
  serviceFileContent.give(patronContentValue);
});

const { sharePossible, sharedStorageRecord } = useSharing();
const sharingPossiblePatron = new VueRefPatron();
sharePossible.value(sharingPossiblePatron);
const sharedStoragePatron = new VueRefPatron();
sharedStorageRecord.value(sharedStoragePatron);
</script>

<template>
  <PatronSchemeEditor
    v-if="canBeUsed && patronContentRef"
    v-model="patronContentRef"
    :presets="presets"
  >
    <template #insideGrid>
      <TheSharingButton v-if="sharingPossiblePatron.value" />
    </template>
    <template #beforeSettingsButtons>
      <button
        v-if="sharedStoragePatron.value"
        type="button"
        class="rounded-main text-md p-md bg-primary hover:bg-primary-second text-white"
        @click="sharedStorageRecord.give(null)"
      >
        Очистить Sharing
      </button>
    </template>
  </PatronSchemeEditor>
  <PageNoContent v-else />
</template>

<style>
body {
  font: 14px Arial, sans-serif;
}
</style>
