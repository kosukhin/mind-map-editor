<script setup lang="ts">
import { watch } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import { useMagicKeys } from '@vueuse/core'
import { useOverlay } from '~/composables'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const isOpened = ref(false)
const { current } = useMagicKeys()
const { overlayName, tryToClose, history } = useOverlay()

const close = () => {
  tryToClose.value = props.name as string
}

watch(overlayName, () => {
  overlayName.map((vModal) => {
    isOpened.value = vModal === props.name
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

const back = () => {
  history.value.pop()
  overlayName.value = String(history.value.pop())
}
</script>

<template>
  <div v-if="isOpened" class="Modal" @click="close">
    <div class="Modal-Inner" @click.stop>
      <div
        v-if="history.length > 1"
        title="Назад"
        class="Modal-Back"
        @click="back"
      >
        &lt;
      </div>
      <div title="Закрыть" class="Modal-Close" @click="close">&times;</div>
      <div v-if="$slots.header" class="Modal-Header">
        <slot name="header" />
      </div>
      <div class="Modal-Content">
        <slot />
      </div>
      <div v-if="$slots.footer" class="Modal-Footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'Modal';
</style>
