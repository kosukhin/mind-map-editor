<script lang="ts" setup>
import MainPage from '@/components/PageMain/PageMain.vue';
import { useMeta } from '@/composables/useMeta';
import { onMounted } from 'vue';

const { head } = useMeta();

onMounted(() => {
  setTimeout(() => {
    head.title = 'Главная страница';
  });
});
</script>

<template>
  <MainPage />
</template>
