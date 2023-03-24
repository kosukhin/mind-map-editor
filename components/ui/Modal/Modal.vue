<script setup lang="ts">
import {watch} from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import {useOverlay} from "~/composables";

const props = defineProps({
  name: {
    type: String,
    required: true,
  }
})

const isOpened = ref(false);
const {overlayName, tryToClose} = useOverlay();

const close = () => {
  tryToClose.value = props.name;
}

watch(overlayName, () => {
  overlayName.map((vModal) => {
    isOpened.value = vModal === props.name;
  })
})
</script>

<template>
  <div class="Modal" @click="close" v-if="isOpened">
    <div class="Modal-Inner" @click.stop>
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "Modal";
</style>
