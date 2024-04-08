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

</script>

<template>
  <div class="BaseTextarea">
    <textarea ref="textarea" v-model="data" class="rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark" />
  </div>
</template>
