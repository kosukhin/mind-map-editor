import { MapObject, MapStructureTypes } from "~/entities/Map";
import { Canvg } from "canvg";
import Konva from "konva";

const { Layer, Image, Text } = Konva;

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
    objectId: object.id
  });
  layer.add(img);

  const labelWidth = object.name.length * 7;
  const text = new Text({
    x: object.position[0] + type.width / 2 - labelWidth / 2,
    y: object.position[1] - 15,
    text: object.name,
    fontSize: 11,
    fontFamily: 'Monospace',
    textDecoration: object.linked ? 'underline' : '',
    fontStyle: object.description ? 'bold' : '',
    fill: 'black',
    objectId: object.id
  });
  layer.add(text);

  img.on('dragmove', (e) => {
    text.position({
      x: e.target.attrs.x + type.width / 2 - labelWidth / 2,
      y: e.target.attrs.y - 15,
    });
  })
}
