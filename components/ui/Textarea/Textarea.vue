<script lang="ts" setup>
import { useTextareaAutosize, useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)
const { textarea, input } = useTextareaAutosize({
  input: data,
})
</script>

<template>
  <div class="Textarea">
    <textarea ref="textarea" v-model="input" class="Textarea-Input" />
  </div>
</template>

<style lang="scss" scoped>
@import 'Textarea';
</style>
