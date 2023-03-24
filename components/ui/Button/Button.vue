<script lang="ts" setup>
import {computed} from "@vue/reactivity";

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  },
  type: {
    type: String,
    default: 'default',
    validator: (value: string) => ['default', 'primary', 'success', 'danger'].includes(value)
  },
});

const classes = computed(() => ({
  'Button': true,
  [`Button_size_${props.size}`]: true,
  [`Button_type_${props.type}`]: true,
}))
</script>

<template>
  <button type="button" :class="classes"><slot /></button>
</template>

<style lang="scss" scoped>
@import "Button";
</style>
