<script lang="ts" setup>
import { useTextareaAutosize, useVModel } from '@vueuse/core';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);

const data = useVModel(props, 'modelValue', emit);
const { textarea, input } = useTextareaAutosize({
  input: data,
});
</script>

<template>
  <div class="BaseTextarea">
    <textarea ref="textarea" v-model="input" class="BaseTextarea-Input" />
  </div>
</template>
