import { useLayer, useMap, useMapPartialRenderer } from '~/composables'
import { all } from '~/utils'

export const useMoveToObject = () => {
  const { stage } = useLayer()
  const { map } = useMap()
  const { triggerPartialRendering } = useMapPartialRenderer()
  return {
    scrollToObject: (id: string) => {
      all([stage, map] as const).map(([vStage, vMap]) => {
        const object = vMap.objects[id]
        if (!object) {
          return
        }
        const x = object.position[0] * -1 + 20
        const y = object.position[1] * -1 + 20
        vStage.position({ x, y })
        triggerPartialRendering()
      })
    },
  }
}
