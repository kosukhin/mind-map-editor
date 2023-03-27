import {MapObject, MapStructure} from "~/entities/Map";
import { Canvg } from "canvg";
import Konva from "konva";
import {MapArrow} from "~/entities";

const { Layer, Image, Text, Arrow } = Konva;

export async function addObjectToLayer(
  layer: InstanceType<typeof Layer>,
  object: MapObject,
  map: MapStructure,
) {
  const {types} = map;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return;
  const type = types[object.type];
  const v = await Canvg.fromString(ctx, type.svg);
  await v.render();
  const img = new Image({
    name: object.id,
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
    name: object.id,
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

  const arrows: MapArrow[] = [];
  object.arrows.forEach(toObjectRelation => {
    const toObject = map.objects[toObjectRelation.id];
    const toObjectType = map.types[toObject.type];
    const arrow = new Arrow({
      x: 0,
      y: 0,
      points: [
        object.position[0] + type.width / 2,
        object.position[1] + type.height / 2,
        toObject.position[0] + toObjectType.width / 2,
        toObject.position[1] + toObjectType.height / 2
      ],
      pointerLength: 20,
      pointerWidth: 10,
      fill: '#ccc',
      stroke: '#888',
      strokeWidth: 2,
    });
    layer.add(arrow);
    arrows.push(arrow);
  });

  return [img, text, ...arrows];
}
