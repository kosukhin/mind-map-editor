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
  <label class="flex gap-2">
    <input v-model="data" type="checkbox" />
    <slot v-if="$slots.default" />
    <template v-else>
      {{ label }}
    </template>
  </label>
</template>
