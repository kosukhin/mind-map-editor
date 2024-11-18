<script setup lang="ts">
import PatronSchemeEditor from '@/components/PatronSchemeEditor.vue';
import { useService } from '@/composables/useService';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import PageNoContent from '@/views/PageNoContent.vue';
import { watch } from 'vue';

const { serviceFileContent } = useService();

const patronContent = new VueRefPatron<string>();
const patronContentRef = patronContent.ref();
serviceFileContent.content(patronContent);

watch(patronContentRef, (patronContentValue: string) => {
  serviceFileContent.give(patronContentValue);
});
</script>

<template>
  <div v-if="patronContent" >
    <PatronSchemeEditor v-model="patronContentRef" />
  </div>
  <PageNoContent v-else />
</template>
