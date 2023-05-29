<script lang="ts" setup>
import { useSharedNotify } from '~/composables'

const { message } = useSharedNotify()
</script>

<template>
  <div
    v-if="!message.isNothing"
    :class="[
      'BaseNotify',
      `BaseNotify_theme_${message.value && message.value[1]}`,
    ]"
  >
    {{ message.value && message.value[0] }}
  </div>
</template>

<style scoped lang="scss">
@import 'BaseNotify';
</style>
