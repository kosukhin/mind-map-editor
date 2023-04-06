import { watch } from '@vue/runtime-core'
import { useLayerEvents, useLayer } from '~/composables'
import { all } from '~/entities'

export const useLayerListenerMouse = () => {
  const { stage } = useLayer()
  const { mouseenter, mouseleave } = useLayerEvents()

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
