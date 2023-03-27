import Konva from "konva";
import {MapLayer, MapStage} from "~/entities/MapLayer";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "~/constants";

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
  stage.dragBoundFunc((pos) => {
    const x = pos.x*-1;
    const y = pos.y*-1;
    return {
      x: x < 0 ? 0 : x > CANVAS_WIDTH ? -1*CANVAS_WIDTH : pos.x,
      y: y < 0 ? 0 : y > CANVAS_HEIGHT ? -1*CANVAS_HEIGHT : pos.y,
    };
  })
  const layer = new Layer();
  stage.add(layer);
  layer.draw();

  return [layer, stage];
}
