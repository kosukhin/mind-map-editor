import { useSharedLayer, useSharedMap, useMapPartialRenderer } from '~/composables'
import { all } from '~/utils'

export function useMoveToObject() {
  const { stage } = useSharedLayer()
  const { map } = useSharedMap()
  const { triggerPartialRendering } = useMapPartialRenderer()

  const scrollToObject = (id: string) => {
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
  }

  return {
    scrollToObject,
  }
}
