<script lang="ts" setup>
// @ts-ignore
import { defineEmits, defineProps, watch, ref } from 'vue';
import { useVModel } from '@vueuse/core';
import debounce from 'lodash/debounce';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);

const input = ref<HTMLInputElement | null>(null);
watch(
  input,
  debounce(() => {
    if (props.autofocus) {
      (input.value as HTMLInputElement).focus();
    }
  }, 500),
);

const data = useVModel(props, 'modelValue', emit);
</script>

<template>
  <input ref="input" v-model="data" class="block rounded-main w-full p-2 border border-solid border-body-dark" type="text" />
</template>
