<script lang="ts" setup>
import { useRouter } from '@/composables/useRouter';
import { useRouter as useRealRouter } from 'vue-router';

const router = useRouter();
const realRouter = useRealRouter();
router.realEffect.value = realRouter.push.bind(realRouter);
</script>

<template>
  <router-view/>
</template>
