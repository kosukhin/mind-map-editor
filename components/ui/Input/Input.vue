<script lang="ts" setup>
import { defineEmits, defineProps, watch, watchEffect } from '@vue/runtime-core'
import { useVModel } from '@vueuse/core'
import { ref } from '@vue/reactivity'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])
const data = useVModel(props, 'modelValue', emit)
const input = ref(null)

watch(input, () => {
  if (props.autofocus) {
    ;(input.value as HTMLInputElement).focus()
  }
})
</script>

<template>
  <input ref="input" v-model="data" class="Input" type="text" />
</template>

<style lang="scss" scoped>
@import 'Input';
</style>
