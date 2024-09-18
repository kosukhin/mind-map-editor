<script lang="ts" setup>
import BaseButton from '@/components/BaseButton/BaseButton.vue';

const type = 'default';
const title = 'Сделать связь';
</script>

<template>
  <BaseButton :type="type">
    {{ title }}
  </BaseButton>
</template>
