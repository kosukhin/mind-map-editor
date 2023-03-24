<script lang="ts" setup>
import {useVModel} from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: String,
  }
});

const emit = defineEmits(['update:modelValue']);

const data = useVModel(props, 'modelValue', emit);
</script>

<template>
  <div class="Textarea">
    <textarea class="Textarea-Input" v-model="data" />
  </div>
</template>

<style lang="scss" scoped>
@import "Textarea";
</style>
