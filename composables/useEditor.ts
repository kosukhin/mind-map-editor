import Konva from "konva";
import { Canvg } from "canvg";
import { http } from "~/utils/http";
import { MapObject, MapStructure } from "~/entities/Map";
import { useRoute } from "vue-router";

const {Stage, Layer} = Konva;

export async function useEditor(editorWrapper: HTMLElement) {
  const route = useRoute();
  const mapName = route.path.replace('/', '');
  const map = await getMap(mapName);
  const layer = await renderCanvas(editorWrapper);

  for (const object of Object.values(map.objects)) {
    addTypeToKonva(layer, object);
  }
}

async function renderCanvas(editorWrapper: HTMLElement) {
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

async function addTypeToKonva(
  layer: InstanceType<typeof Layer>,
  object: MapObject
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const v = await Canvg.fromString(ctx, '');
}

async function getMap(mapName: string): Promise<MapStructure> {
  const response = await http({
    method: 'get',
    url: '/api/get-map',
    params: {
      document: mapName,
    },
  })

  const result = (response as any).data.structure as MapStructure;

  for (const objectId of Object.keys(result.objects)) {
    result.objects[objectId] = {
      ...result.objects[objectId],
      id: objectId
    }
  }

  return result;
}