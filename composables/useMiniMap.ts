import { watch } from '@vue/runtime-core'
import { watchOnce } from '@vueuse/core'
import debounce from 'lodash/debounce'
import {
  useCanvas,
  useCurrentMap,
  useLayer,
  useLayerEvents,
} from '~/composables'
import { all, any, MaybeInst } from '~/entities'
import { unwrap } from '~/utils'
import { miniMapCalculateSizes, miniMapRedrawHandler } from '~/application'

export const useMiniMap = (
  miniMap: MaybeInst<HTMLDivElement>,
  miniMapScreen: MaybeInst<HTMLDivElement>
) => {
  const { firstMapLoad } = useCurrentMap()
  const { layer, stage } = useLayer()
  const { canvasSize } = useCanvas()
  const { dragmove, wheel } = useLayerEvents()

  watch(canvasSize, () => {
    all([canvasSize] as const)
      .map(unwrap(miniMapCalculateSizes))
      .map(([miniMapSizes, miniMapScreenSizes]) => {
        miniMap.value.style.width = miniMapSizes.w + 'px'
        miniMap.value.style.height = miniMapSizes.h + 'px'
        miniMapScreen.value.style.width = miniMapScreenSizes.w + 'px'
        miniMapScreen.value.style.height = miniMapScreenSizes.h + 'px'
      })
  })

  watchOnce(firstMapLoad, () => {
    all([layer, stage, miniMap, miniMapScreen, canvasSize] as const)
      .map(unwrap(miniMapRedrawHandler))
      .map(({ redrawPreviewLayer, calculateMiniScreen }) => {
        setTimeout(redrawPreviewLayer)
        watch(
          [dragmove, wheel],
          debounce(() => {
            any([dragmove, wheel]).map(() => {
              redrawPreviewLayer()
              const [vMiniMapScreen, miniScreenX, miniScreenY] =
                calculateMiniScreen()
              vMiniMapScreen.style.top = miniScreenY + 'px'
              vMiniMapScreen.style.left = miniScreenX + 'px'
            })
          }, 500)
        )
      })
  })
}
