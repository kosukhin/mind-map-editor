import { watch } from '@vue/runtime-core'
import { useLayer } from '~/composables/useLayer'
import { useLayerEvents } from '~/composables/useLayerEvents'
import { allSet } from '~/entities'
import { useCanvasBoundaries } from '~/composables/useCanvasBoundaries'

export const useLayerListenerWheel = () => {
  const { stage } = useLayer()
  const { wheel } = useLayerEvents()
  const { restrictBoundaries } = useCanvasBoundaries()

  watch(wheel, () => {
    allSet([stage, wheel] as const).map(([vStage, e]) => {
      e.evt.preventDefault()
      const dx = e.evt.deltaX
      const dy = e.evt.deltaY
      const x = vStage.x() - dx
      const y = vStage.y() - dy
      vStage.position(restrictBoundaries({ x, y }))
    })
  })
}
