<script lang="ts" setup>
import {computed} from "@vue/reactivity";

const props = defineProps({
  modelValue: {
    type: String,
  }
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="Input">
    <input v-model="value" type="text" />
  </div>
</template>
