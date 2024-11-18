<script setup lang="ts">
import { watch } from 'vue';
import PatronSchemeEditor from '@/components/PatronSchemeEditor.vue';
import { useService } from '@/composables/useService';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import PageNoContent from '@/views/PageNoContent.vue';

const { serviceFileContent } = useService();

const patronContent = new VueRefPatron<string>();
const patronContentRef = patronContent.ref();
serviceFileContent.content(patronContent);

const canBeUsed = serviceFileContent.canBeUsed(new VueRefPatron()).ref();

watch(patronContentRef, (patronContentValue: string) => {
  serviceFileContent.give(patronContentValue);
});
</script>

<template>
  <PatronSchemeEditor v-if="canBeUsed && patronContentRef" v-model="patronContentRef" />
  <PageNoContent v-else />
</template>
