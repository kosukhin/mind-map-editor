<script setup lang="ts">
import {useOverlay} from "~/composables/useOverlay";
import {watch} from "@vue/runtime-core";
import {ref} from "@vue/reactivity";

const props = defineProps({
  name: {
    type: String,
    required: true,
  }
});

const isOpened = ref(false);
const {overlayName, tryToClose} = useOverlay();

const close = () => {
  tryToClose.value = props.name;
}

watch(overlayName, () => {
  overlayName.map((vDrawer) => {
    isOpened.value = vDrawer === props.name;
  })
})
</script>

<template>
  <div class="Drawer" @click="close" v-if="isOpened">
    <div class="Drawer-Inner" @click.stop>
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "Drawer";
</style>
