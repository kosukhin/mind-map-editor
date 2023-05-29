import { watch } from '@vue/runtime-core'
import { useSharedLayerEvents, useSharedLayer } from '~/composables'
import { all } from '~/utils'

export function useLayerListenerMouse() {
  const { stage } = useSharedLayer()
  const { mouseenter, mouseleave } = useSharedLayerEvents()
  watch(mouseenter, () => {
    all([stage, mouseenter] as const).map(([vStage, e]) => {
      if (e.target.attrs.image || e.target.attrs.text) {
        vStage.container().style.cursor = 'pointer'
      }
    })
  })
  watch(mouseleave, () => {
    all([stage, mouseleave] as const).map((args) => {
      args[0].container().style.cursor = 'default'
    })
  })
}
