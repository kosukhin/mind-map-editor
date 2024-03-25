<script lang="ts" setup>
import { useDebugString } from '@/composables/useDebugString';
import { useRouter } from '@/composables/useRouter';
import { jsonStringify } from '@/utils/jsonStringify';
import { onErrorCaptured } from 'vue';
import { useRouter as useRealRouter } from 'vue-router';

const router = useRouter();
const realRouter = useRealRouter();
router.realEffect.value = realRouter.push.bind(realRouter);

const { append } = useDebugString();
onErrorCaptured((e) => {
  append(`error ${jsonStringify(e)}`);
});
</script>

<template>
  <router-view/>
</template>
