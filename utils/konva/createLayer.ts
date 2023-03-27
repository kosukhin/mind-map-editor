import Konva from "konva";
import {MapLayer, MapStage} from "~/entities/MapLayer";

const {Stage, Layer} = Konva;

export function createLayer(editorWrapper: HTMLElement): [MapLayer, MapStage] {
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

  return [layer, stage];
}
