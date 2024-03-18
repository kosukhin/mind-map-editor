<script lang="ts" setup>
import { useVModel } from '@vueuse/core';

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  label: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);

const data = useVModel(props, 'modelValue', emit);
</script>

<template>
  <label>
    <input v-model="data" type="checkbox" />
    {{ label }}
  </label>
</template>
