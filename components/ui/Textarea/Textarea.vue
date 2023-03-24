<script lang="ts" setup>
import {useTextareaAutosize, useVModel} from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: String,
  }
});

const emit = defineEmits(['update:modelValue']);

const data = useVModel(props, 'modelValue', emit);
const { textarea, input } = useTextareaAutosize({
  input: data
});
</script>

<template>
  <div class="Textarea">
    <textarea ref="textarea" class="Textarea-Input" v-model="input" />
  </div>
</template>

<style lang="scss" scoped>
@import "Textarea";
</style>
