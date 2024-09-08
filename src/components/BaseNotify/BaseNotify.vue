<script lang="ts" setup>
import { useApplication } from '@/composables/useApplication';

const { notification } = useApplication();
</script>

<template>
  <div v-if="notification && notification.text !== 'hide'" :class="['fixed bottom-3 right-[50%] translate-x-[50%] p-3 rounded', `bg-${notification.type}`]">
    {{ notification.text }}
  </div>
</template>
