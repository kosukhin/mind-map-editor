<script lang="ts" setup>
import BaseButton from '@/components/BaseButton/BaseButton.vue';

const type = 'success';
const title = 'title';
</script>

<template>
  <BaseButton :type="type">
    {{ title }}
  </BaseButton>
</template>
