<script setup lang="ts">
import { ref, watch } from 'vue';
import { useService } from '@/composables/useService';
import PageNoContent from '@/views/PageNoContent.vue';
import { PatronSchemeEditor, VueRefPatron, useFactories } from 'patron-scheme-editor';
import 'patron-scheme-editor/patron-scheme-editor.css';

const { serviceFileContent } = useService();

const canBeUsed = serviceFileContent.canBeUsed(new VueRefPatron()).ref();

const { patron } = useFactories();

const patronContentRef = ref();
serviceFileContent.content(patron.create((content: boolean) => {
  console.log('content', content);
  patronContentRef.value = content;
}));

watch(patronContentRef, (patronContentValue: string) => {
  console.log('patron value', patronContentValue);

  serviceFileContent.give(patronContentValue);
});
</script>

<template>
  <PatronSchemeEditor v-if="canBeUsed && patronContentRef" v-model="patronContentRef" />
  <PageNoContent v-else />
</template>
