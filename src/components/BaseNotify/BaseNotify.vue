<script lang="ts" setup>
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';

const { notification } = useApplication();
const notificationRef = notification.message(new VueRefPatron()).ref();
</script>

<template>
  <div v-if="notificationRef && notificationRef.text !== 'hide'" :class="['inline', `text-${notificationRef.type}`]">
    {{ notificationRef.text }}
  </div>
</template>
