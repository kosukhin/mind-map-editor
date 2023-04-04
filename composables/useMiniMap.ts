import { UnwrapRef } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { watchOnce } from '@vueuse/core'
import debounce from 'lodash/debounce'
import {
  useCanvas,
  useCurrentMap,
  useLayer,
  useLayerEvents,
} from '~/composables'
import { allSet, anySet, MaybeInst } from '~/entities'
import { unwrapTuple } from '~/utils'
import { miniMapCalculateSizes, miniMapRedrawHandler } from '~/application'

export const useMiniMap = (
  miniMap: UnwrapRef<MaybeInst<HTMLDivElement>>,
  miniMapScreen: UnwrapRef<MaybeInst<HTMLDivElement>>
) => {
  const { firstMapLoad } = useCurrentMap()
  const { layer, stage } = useLayer()
  const { canvasSize } = useCanvas()
  const { dragmove, wheel } = useLayerEvents()

  watch(canvasSize, () => {
    allSet([canvasSize, miniMap, miniMapScreen])
      .map(unwrapTuple(miniMapCalculateSizes))
      .map(([miniMapSizes, miniMapScreenSizes]) => {
        miniMap.value.style.width = miniMapSizes.w + 'px'
        miniMap.value.style.height = miniMapSizes.h + 'px'
        miniMapScreen.value.style.width = miniMapScreenSizes.w + 'px'
        miniMapScreen.value.style.height = miniMapScreenSizes.h + 'px'
      })
  })

  watchOnce(firstMapLoad, () => {
    allSet([layer, stage, miniMap, miniMapScreen, canvasSize] as const)
      .map(unwrapTuple(miniMapRedrawHandler))
      .map(({ redrawPreviewLayer, calculateMiniScreen }) => {
        setTimeout(redrawPreviewLayer)
        watch(
          [dragmove, wheel],
          debounce(() => {
            anySet([dragmove, wheel]).map(() => {
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
