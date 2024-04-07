<script lang="ts" setup>
const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
  },
  type: {
    type: String,
    default: 'standard',
    validator: (value: string) => ['primary', 'success', 'danger'].includes(value),
  },
});

// Классы bg-standard bg-primary bg-success bg-danger
// Размеры p-sm p-md p-lg
// Тексты text-sm text-md text-lg
const classes = ['rounded-main', `text-${props.size}`, `p-${props.size}`, `bg-${props.type}`];

if (props.type === 'standard') {
  classes.push('border border-solid border-body-dark box-border');
}
</script>

<template>
  <button type="button" :class="classes"><slot /></button>
</template>
