<script lang="ts" setup>
import { useNotify } from '~/composables/useNotify'

const { message } = useNotify()
</script>

<template>
  <div v-if="!message.isNothing" class="Notify">
    {{ message.value }}
  </div>
</template>

<style scoped lang="scss">
@import 'Notify';
</style>
