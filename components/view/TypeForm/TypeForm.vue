<script lang="ts" setup>
import { useMapTypes } from "~/composables";
import { SHOW_TYPE } from "~/constants";
import { ref } from "@vue/reactivity";
import { useFormDirtyCheck } from "~/composables/useFormDirtyCheck";

const { currentType } = useMapTypes();
const isDirty = ref(false);
useFormDirtyCheck(isDirty, SHOW_TYPE);
</script>

<template>
  <div v-if="!currentType.isNothing">
    <div>width: {{ currentType.value.width }}</div>
    <div>height: {{ currentType.value.height }}</div>
    <div v-html="currentType.value.svg"></div>
  </div>
</template>
