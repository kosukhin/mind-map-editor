<script setup lang="ts">
import { watch } from '@vue/runtime-core'
import { computed, ref } from '@vue/reactivity'
import { useMagicKeys } from '@vueuse/core'
import { useOverlay } from '~/composables/useOverlay'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    default: 'ltr',
    validator: (value: string) => ['ltr', 'rtl', 'ttb', 'btt'].includes(value),
  },
})

const isOpened = ref(false)
const { current } = useMagicKeys()
const { overlayName, tryToClose } = useOverlay()
const classes = computed(() => ({
  Drawer: true,
  [`Drawer_Direction_${props.direction}`]: true,
}))

const close = () => {
  tryToClose.value = props.name as string
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
  <div v-if="isOpened" :class="classes" @click="close">
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
