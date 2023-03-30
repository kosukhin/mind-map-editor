<script lang="ts" setup>
import { defineEmits, defineProps } from '@vue/runtime-core'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
})

const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)
</script>

<template>
  <input v-model="data" class="Input" type="text" />
</template>

<style lang="scss" scoped>
@import 'Input';
</style>
