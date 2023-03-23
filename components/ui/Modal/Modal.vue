<script setup lang="ts">
import { watchEffect } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import {useOverlay} from "~/composables";

const props = defineProps({
  name: {
    type: String,
    required: true,
  }
})

const isOpened = ref(false);
const {overlayName} = useOverlay();

const close = () => {
  isOpened.value = false;
  overlayName.value = '';
}

watchEffect(() => {
  overlayName.map((vModal) => {
    if (vModal === props.name) {
      isOpened.value = true;
    }
  })
})
</script>

<template>
  <div class="Modal" @click="close" v-if="isOpened">
    <div class="Modal-Inner">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "Modal";
</style>
