<script lang="ts" setup>
import { defineEmits } from '@vue/runtime-core'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: [String, Number],
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
})

const emit = defineEmits(['update:modelValue'])
const data = useVModel(props, 'modelValue', emit)
</script>

<template>
  <select v-model="data" class="Select">
    <option
      v-for="item in props.items"
      :key="item[props.optionId]"
      :value="item[props.optionId]"
    >
      {{ item[props.optionLabel] }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
@import 'Select';
</style>
