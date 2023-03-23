<script setup lang="ts">
import { useOverlay } from "~/composables/useOverlay";
import { watchEffect } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";

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
  overlayName.map((vDrawer) => {
    if (vDrawer === props.name) {
      isOpened.value = true;
    }
  })
})
</script>

<template>
  <div class="Drawer" @click="close" v-if="isOpened">
    <div class="Drawer-Inner">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "Drawer";
</style>
