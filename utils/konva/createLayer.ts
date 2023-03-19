import Konva from "konva";

const {Stage, Layer} = Konva;

export async function createLayer(editorWrapper: HTMLElement) {
  const canvasSize = {
    width: editorWrapper.clientWidth,
    height: editorWrapper.clientHeight,
  };
  const stage = new Stage({
    ...canvasSize,
    container: 'canvas',
    fill: '#eee',
    draggable: true,
  });
  const layer = new Layer();
  stage.add(layer);
  layer.draw();

  return layer
}