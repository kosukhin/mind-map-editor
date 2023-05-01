<script setup lang="ts">
import { watch } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import { useMagicKeys } from '@vueuse/core'
import { useOverlay } from '~/composables/useOverlay'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const isOpened = ref(false)
const { current } = useMagicKeys()
const { overlayName, tryToClose } = useOverlay()

const close = () => {
  tryToClose.value = props.name
}

watch(overlayName, () => {
  overlayName.map((vDrawer) => {
    isOpened.value = vDrawer === props.name
  })
})

watch(current, () => {
  if (!isOpened.value) {
    return
  }

  if (current.has('escape')) {
    close()
  }
})
</script>

<template>
  <div v-if="isOpened" class="Drawer" @click="close">
    <div class="Drawer-Inner" @click.stop>
      <div v-if="$slots.header">
        <slot name="header" class="Drawer-Header" />
      </div>
      <div class="Drawer-Content">
        <slot />
      </div>
      <div v-if="$slots.footer" class="Drawer-Footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'Drawer';
</style>
