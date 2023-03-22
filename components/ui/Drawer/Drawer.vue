<script setup lang="ts">
import { useDrawer } from "~/composables/useDrawer";
import { watch } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";

const props = defineProps({
  name: {
    type: String,
    required: true,
  }
})

const isOpened = ref(false);
const {drawer} = useDrawer();

const close = () => {
  isOpened.value = false;
  drawer.value = '';
}

watch(drawer, () => {
  drawer.map((vDrawer) => {
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