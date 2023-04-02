import debounce from 'lodash/debounce'
import Konva from 'konva'
import { setElementPosition } from '~/utils'
import { CanvasSize, Layer, MapLayer, Stage } from '~/entities'
import { MINIMAP_SCALE } from '~/constants'
import { miniMapCalculateSizes } from '~/application'

export const miniMapRedrawHandler = (
  vLayer: Layer,
  vStage: Stage,
  vMiniMap: HTMLElement,
  vMiniMapScreen: HTMLElement,
  vCanvasSize: CanvasSize
) => {
  const [{ w, h }] = miniMapCalculateSizes(vCanvasSize)
  const scale = MINIMAP_SCALE
  let previewLayer: MapLayer | null = null
  const previewStage = new Konva.Stage({
    container: vMiniMap,
    width: w,
    height: h,
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

  const calculateMiniScreen = () => {
    const miniScreenX = vStage.x() * scale * -1
    const miniScreenY = vStage.y() * scale * -1
    setElementPosition(vMiniMapScreen, [miniScreenY, miniScreenX])

    return [vMiniMapScreen, miniScreenX, miniScreenY]
  }

  return {
    redrawPreviewLayer,
    calculateMiniScreen,
  }
}
