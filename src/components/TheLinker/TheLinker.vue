<script lang="ts" setup>
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import { useObjectLinker } from '@/composables/useObjectLinker';

const { startRelation, title, type } = useObjectLinker();
</script>

<template>
  <BaseButton :type="type" @click="startRelation">
    {{ title }}
  </BaseButton>
</template>
