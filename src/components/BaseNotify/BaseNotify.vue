<script lang="ts" setup>
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';

const { notification } = useApplication();
const notificationRef = notification.message(new VueRefPatron()).ref();
</script>

<template>
  <div v-if="notificationRef && notificationRef.text !== 'hide'" :class="['fixed bottom-3 right-[50%] translate-x-[50%] p-3 rounded', `bg-${notificationRef.type}`]">
    {{ notificationRef.text }}
  </div>
</template>
