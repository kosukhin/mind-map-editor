<script lang="ts" setup>
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';

const { notification } = useApplication();
const notificationRef = notification.message(new VueRefPatron()).ref();

// text-success-second text-danger-second text-error-second
</script>

<template>
  <div
    v-if="notificationRef && notificationRef.text !== 'hide'"
    :class="['inline font-bold', `text-${notificationRef.type}-second`]"
  >
    {{ notificationRef.text }}
  </div>
</template>
