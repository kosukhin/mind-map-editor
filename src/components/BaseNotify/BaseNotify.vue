<script lang="ts" setup>
import { useNotify } from '@/composables/useNotify';

const { message } = useNotify();
</script>

<template>
  <div v-if="message" :class="['absolute bottom-3 right-3 p-3 rounded', `bg-${message[1]}`]">
    {{ message[0] }}
  </div>
</template>
