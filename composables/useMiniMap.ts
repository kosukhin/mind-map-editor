import Konva from 'konva'
import { Ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import debounce from 'lodash/debounce'
import {
  useCanvas,
  useCurrentMap,
  useLayer,
  useLayerEvents,
} from '~/composables'
import { allSet, anySet, MapLayer } from '~/entities'
import { CANVAS_HEIGHT, CANVAS_WIDTH, MINIMAP_SCALE } from '~/constants'

const { Stage } = Konva

export const useMiniMap = (
  miniMap: Ref<HTMLDivElement | undefined>,
  miniMapScreen: Ref<HTMLDivElement | undefined>
) => {
  const { firstMapLoad } = useCurrentMap()
  const { layer, stage } = useLayer()
  const { canvasSize } = useCanvas()
  const { dragmove, wheel } = useLayerEvents()
  let previewLayer: MapLayer | null = null
  const scale = MINIMAP_SCALE
  let miniMapWidth = CANVAS_WIDTH
  let miniMapHeight = CANVAS_HEIGHT

  watch(canvasSize, () => {
    canvasSize.map((vCanvasSize) => {
      const miniScreenWidth = vCanvasSize.w * scale
      const miniScreenHeight = vCanvasSize.h * scale
      miniMapWidth = CANVAS_WIDTH * scale
      miniMapHeight = CANVAS_HEIGHT * scale

      if (miniMap.value) {
        miniMap.value.style.width = miniMapWidth + 'px'
        miniMap.value.style.height = miniMapHeight + 'px'
      }

      if (miniMapScreen.value) {
        miniMapScreen.value.style.width = miniScreenWidth + 'px'
        miniMapScreen.value.style.height = miniScreenHeight + 'px'
      }
    })
  })

  watch(firstMapLoad, () => {
    allSet([layer, stage] as const).map(([vLayer, vStage]) => {
      if (!miniMap.value) return

      const previewStage = new Stage({
        container: miniMap.value,
        width: miniMapWidth,
        height: miniMapHeight,
        scaleX: scale,
        scaleY: scale,
      })

      const redrawPreviewLayer = debounce(() => {
        if (previewLayer) {
          previewLayer.destroy()
        }

        previewLayer = vLayer.clone({ listening: false })
        previewStage.add(previewLayer)
      }, 100)

      setTimeout(redrawPreviewLayer)

      const calculateMiniScreen = () => {
        if (miniMapScreen.value) {
          const miniScreenX = vStage.x() * scale * -1
          const miniScreenY = vStage.y() * scale * -1
          miniMapScreen.value.style.top = miniScreenY + 'px'
          miniMapScreen.value.style.left = miniScreenX + 'px'
        }
      }

      watch([dragmove, wheel], () => {
        anySet([dragmove, wheel]).map(() => {
          redrawPreviewLayer()
          calculateMiniScreen()
        })
      })
    })
  })
}
