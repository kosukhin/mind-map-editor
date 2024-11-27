<script lang="ts" setup>
import { useVModel } from '@vueuse/core';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);

defineOptions({
  inheritAttrs: false,
})

const data = useVModel(props, 'modelValue', emit);

</script>

<template>
  <div class="BaseTextarea">
    <textarea ref="textarea" :v-bind="$attrs" v-model="data" class="rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark" />
  </div>
</template>
