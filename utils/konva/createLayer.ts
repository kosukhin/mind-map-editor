import Konva from 'konva'
import { Layer, Stage } from '~/entities'

export function createLayer(editorWrapper: HTMLElement): [Layer, Stage] {
  const canvasSize = {
    width: editorWrapper.clientWidth,
    height: editorWrapper.clientHeight,
  }
  const stage = new Konva.Stage({
    ...canvasSize,
    container: 'canvas',
    fill: '#eee',
    draggable: true,
  })

  const layer = new Konva.Layer()
  stage.add(layer)
  layer.draw()

  return [layer, stage]
}
