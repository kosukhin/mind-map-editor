<script lang="ts" setup>
import { useNotify } from '~/composables/useNotify'

const { message } = useNotify()
</script>

<template>
  <div
    v-if="!message.isNothing"
    :class="['Notify', `Notify_theme_${message.value && message.value[1]}`]"
  >
    {{ message.value && message.value[0] }}
  </div>
</template>

<style scoped lang="scss">
@import 'Notify';
</style>
