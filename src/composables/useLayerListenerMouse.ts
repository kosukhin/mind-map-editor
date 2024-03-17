import { watch } from '@vue/runtime-core'
import { createSharedComposable } from '@vueuse/core'
import { useSharedLayer, useSharedLayerEvents } from '@/composables'

export const useLayerListenerMouse = createSharedComposable(() => {
  const { stage } = useSharedLayer()
  const { mouseenter, mouseleave } = useSharedLayerEvents()

  watch(mouseenter, () => {
    if (stage.value && mouseenter.value) {
      if (
        mouseenter.value.target.attrs.image ||
        mouseenter.value.target.attrs.text
      ) {
        stage.value.container().style.cursor = 'pointer'
      }
    }
  })

  watch(mouseleave, () => {
    if (stage.value && mouseleave.value) {
      stage.value.container().style.cursor = 'default'
    }
  })
})
