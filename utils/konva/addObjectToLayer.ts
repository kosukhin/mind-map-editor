import { MapObject, MapStructureTypes } from "~/entities/Map";
import { Canvg } from "canvg";
import Konva from "konva";

const { Layer, Image } = Konva;

export async function addObjectToLayer(
  layer: InstanceType<typeof Layer>,
  object: MapObject,
  types: MapStructureTypes,
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const type = types[object.type];
  const v = await Canvg.fromString(ctx, type.svg);
  await v.render();
  const img = new Image({
    image: canvas,
    x: object.position[0],
    y: object.position[1],
    width: type.width,
    height: type.height,
    draggable: true,
  });
  layer.add(img);
}
