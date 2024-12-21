<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
// @ts-ignore
import { PropType, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number] as PropType<string | number | null | undefined>,
    default: '',
  },
  items: {
    type: Array,
    required: true,
  },
  optionId: {
    type: String,
    required: true,
  },
  optionLabel: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);

const data = useVModel(props, 'modelValue', emit);
</script>

<template>
  <select label="select" v-model="data" class="block bg-white rounded-main w-full p-2 border border-solid border-body-dark">
    <option
      v-for="item in props.items"
      :key="item[props.optionId]"
      :value="item[props.optionId]"
    >
      {{ item[props.optionLabel] }}
    </option>
  </select>
</template>
