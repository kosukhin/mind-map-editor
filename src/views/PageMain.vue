<script lang="ts" setup>
import MainPage from '@/components/PageMain/PageMain.vue';
import { useSharedMeta } from '@/composables/useSharedMeta';
import { onMounted } from 'vue';

const { head } = useSharedMeta();

onMounted(() => {
  setTimeout(() => {
    head.title = 'Главная страница';
  });
});
</script>

<template>
  <MainPage />
</template>
