<script setup lang="ts">
import PageEditor from '@/views/PageEditor.vue';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import PageNoContent from '@/views/PageNoContent.vue';

const { fileContent } = useApplication();

const hasContent = fileContent.canBeUsed(new VueRefPatron()).ref();
</script>

<template>
  <PageEditor v-if="hasContent" />
  <PageNoContent v-else />
</template>
