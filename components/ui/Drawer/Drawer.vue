<script setup lang="ts">
import { useOverlay } from "~/composables/useOverlay";
import { watchEffect } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import {OVERLAY_CLOSE} from "~/constants";

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
  overlayName.value = OVERLAY_CLOSE;
}

watchEffect(() => {
  overlayName.map((vDrawer) => {
    isOpened.value = vDrawer === props.name;
  })
})
</script>

<template>
  <div class="Drawer" @click="close" v-if="isOpened">
    <div class="Drawer-Inner" @click.stop>
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "Drawer";
</style>
