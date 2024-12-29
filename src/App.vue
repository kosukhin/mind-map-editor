<script setup lang="ts">
import { ref, watch } from 'vue';
import { useService } from '@/composables/useService';
import PageNoContent from '@/views/PageNoContent.vue';
import { PatronSchemeEditor, VueRefPatron, useFactories } from 'patron-scheme-editor';
import 'patron-scheme-editor/patron-scheme-editor.css';
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
</script>

<template>
  <PatronSchemeEditor v-if="canBeUsed && patronContentRef" v-model="patronContentRef" :presets="presets" />
  <PageNoContent v-else />
</template>
