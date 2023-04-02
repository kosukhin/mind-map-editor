import Konva from 'konva'
import { UnwrapRef } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import debounce from 'lodash/debounce'
import { watchOnce } from '@vueuse/core'
import {
  useCanvas,
  useCurrentMap,
  useLayer,
  useLayerEvents,
} from '~/composables'
import { allSet, anySet, MapLayer, MaybeInst } from '~/entities'
import { CANVAS_HEIGHT, CANVAS_WIDTH, MINIMAP_SCALE } from '~/constants'
import { setElementPosition, unwrapTuple } from '~/utils'
import { miniMapCalculateSizes } from '~/application'

const { Stage } = Konva

export const useMiniMap = (
  miniMap: UnwrapRef<MaybeInst<HTMLDivElement>>,
  miniMapScreen: UnwrapRef<MaybeInst<HTMLDivElement>>
) => {
  const { firstMapLoad } = useCurrentMap()
  const { layer, stage } = useLayer()
  const { canvasSize } = useCanvas()
  const { dragmove, wheel } = useLayerEvents()
  let previewLayer: MapLayer | null = null
  const scale = MINIMAP_SCALE
  const miniMapWidth = CANVAS_WIDTH
  const miniMapHeight = CANVAS_HEIGHT

  watch(canvasSize, () => {
    allSet([canvasSize, miniMap, miniMapScreen])
      .chain(unwrapTuple(miniMapCalculateSizes))
      .map(([miniMapSizes, miniMapScreenSizes]) => {
        miniMap.value.style.width = miniMapSizes.w + 'px'
        miniMap.value.style.height = miniMapSizes.h + 'px'
        miniMapScreen.value.style.width = miniMapScreenSizes.w + 'px'
        miniMapScreen.value.style.height = miniMapScreenSizes.h + 'px'
      })
  })

  watchOnce(firstMapLoad, () => {
    allSet([layer, stage, miniMap, miniMapScreen] as const).map(
      ([vLayer, vStage, vMiniMap, vMiniMapScreen]) => {
        const previewStage = new Stage({
          container: vMiniMap,
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
          const miniScreenX = vStage.x() * scale * -1
          const miniScreenY = vStage.y() * scale * -1
          setElementPosition(vMiniMapScreen, [miniScreenY, miniScreenX])
          vMiniMapScreen.style.top = miniScreenY + 'px'
          vMiniMapScreen.style.left = miniScreenX + 'px'
        }

        watch([dragmove, wheel], () => {
          anySet([dragmove, wheel]).map(() => {
            redrawPreviewLayer()
            calculateMiniScreen()
          })
        })
      }
    )
  })
}
