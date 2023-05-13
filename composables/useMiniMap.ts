import { watch } from '@vue/runtime-core'
import { watchOnce } from '@vueuse/core'
import debounce from 'lodash/debounce'
import { useCanvas, useMap, useLayer, useLayerEvents } from '~/composables'
import { MaybeInst } from '~/entities'
import { all, any } from '~/utils'
import { miniMapCalculateSizes, miniMapRedrawHandler } from '~/application'
import { MINI_MAP_UPDATE_FREQ } from '~/constants'

export const useMiniMap = (
  miniMap: MaybeInst<HTMLDivElement>,
  miniMapScreen: MaybeInst<HTMLDivElement>
) => {
  const { firstMapLoad } = useMap()
  const { layer, stage } = useLayer()
  const { canvasSize } = useCanvas()
  const { dragmove, wheel } = useLayerEvents()
  watch(canvasSize, () => {
    all([canvasSize] as const)
      .map(miniMapCalculateSizes)
      .map(([miniMapSizes, miniMapScreenSizes]) => {
        all([miniMap, miniMapScreen] as const).map(
          ([vMiniMap, vMiniMapScreen]) => {
            vMiniMap.style.width = miniMapSizes.w + 'px'
            vMiniMap.style.height = miniMapSizes.h + 'px'
            vMiniMapScreen.style.width = miniMapScreenSizes.w + 'px'
            vMiniMapScreen.style.height = miniMapScreenSizes.h + 'px'
          }
        )
      })
  })
  watchOnce(firstMapLoad, () => {
    all([layer, stage, miniMap, miniMapScreen, canvasSize] as const)
      .map(miniMapRedrawHandler)
      .map(({ redrawPreviewLayer, calculateMiniScreen }) => {
        setTimeout(redrawPreviewLayer)
        watch(
          [dragmove, wheel],
          debounce(() => {
            any([dragmove, wheel] as const).map(() => {
              const [vMiniMapScreen, miniScreenX, miniScreenY] =
                calculateMiniScreen()
              vMiniMapScreen.style.top = miniScreenY + 'px'
              vMiniMapScreen.style.left = miniScreenX + 'px'
            })
          }, MINI_MAP_UPDATE_FREQ)
        )
      })
  })
}
