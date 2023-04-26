import { useLayer } from '~/composables/useLayer'

export const useMoveToObject = () => {
  const { stage, layerObjects } = useLayer()

  return {
    scrollToObject: (id: string) => {
      if (!layerObjects.has(id)) {
        return
      }

      stage.map((vStage) => {
        const [img] = layerObjects.get(id)
        const x = img.x() * -1 + 20
        const y = img.y() * -1 + 20

        vStage.position({ x, y })
      })
    },
  }
}
