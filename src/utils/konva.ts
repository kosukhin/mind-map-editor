import Konva from 'konva';
import {
  KonvaLayerObject, Arrow, Layer, Stage,
} from '@/entities/Konva';
import { MapObject, MapStructure } from '@/entities/Map';
import { maxNewLineLength, newLineCount } from '@/utils/common';
import { generateUniqString } from '@/utils/string';
import { cloneDeep } from 'lodash';
import { useSharedMapColors } from '@/composables/useSharedMapColors';
import { arrowStartPointPosition } from '@/application/arrowStartPointPosition';

export async function addObjectToLayer(
  layer: Layer,
  object: MapObject,
  map: MapStructure,
  clickLocked = false,
) {
  const { colorsHash } = useSharedMapColors();
  const { types } = map;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const additionalObjects = [];
  if (!ctx) return [];
  const type = types[object.type];
  const imageObj = new Image();
  const objectWidth = object.width || type.width;
  const objectHeight = object.height || type.height;

  const img = new Konva.Image({
    name: object.id,
    image: imageObj,
    x: object.position[0],
    y: object.position[1],
    width: objectWidth,
    height: objectHeight,
    draggable: !clickLocked,
    objectId: object.id,
  });
  let { svg } = type;
  if (object.additionalFields) {
    Object.entries(object.additionalFields).forEach(([key, value]) => {
      svg = svg.replaceAll(`\${${key}}`, value);
    });
  }
  ['width', 'height'].forEach((key) => {
    svg = svg.replaceAll(`\${${key}}`, (object as any)[key]);
  });

  imageObj.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  layer.add(img);
  const labelWidth = maxNewLineLength(object.name) * 7;
  const text = new Konva.Text({
    name: object.id,
    x: object.position[0] + objectWidth / 2 - labelWidth / 2,
    y: object.position[1] + objectHeight + 5,
    text: object.name,
    fontSize: 11,
    fontFamily: 'Monospace',
    textDecoration: object.linked && !object.additionalName ? 'underline' : '',
    fontStyle: object.description ? 'bold' : '',
    fill: colorsHash.value[object.lastClick] ?? 'black',
    objectId: object.id,
  });
  layer.add(text);
  if (object.additionalName) {
    const labelAdditionalWidth = maxNewLineLength(object.additionalName) * 7;
    const labelHeight = newLineCount(object.additionalName) * 11;
    const additionalText = new Konva.Text({
      name: object.id,
      x: object.position[0] + objectWidth / 2 - labelAdditionalWidth / 2,
      y: object.position[1] - labelHeight - 4,
      text: object.additionalName,
      fontSize: 11,
      fontFamily: 'Monospace',
      textDecoration: object.linked ? 'underline' : '',
      fontStyle: object.description ? 'bold' : '',
      fill: colorsHash.value[object.lastClick] ?? 'black',
      objectId: object.id,
    });
    layer.add(additionalText);
    additionalObjects.push(additionalText);
  }
  const arrows: Arrow[] = [];
  if (object.arrows) {
    object.arrows.forEach((toObjectRelation) => {
      const toObject = map.objects[toObjectRelation.id];
      if (!toObject) {
        return;
      }
      const toObjectType = map.types[toObject.type];

      const startPoint = arrowStartPointPosition({
        width: objectWidth,
        height: objectHeight,
      }, {
        x: object.position[0],
        y: object.position[1],
      }, {
        x: toObject.position[0],
        y: toObject.position[1],
      });
      const endPoint = arrowStartPointPosition({
        width: toObject.width || toObjectType.width,
        height: toObject.height || toObjectType.height,
      }, {
        x: toObject.position[0],
        y: toObject.position[1],
      }, {
        x: object.position[0],
        y: object.position[1],
      });

      const arrow = new Konva.Arrow({
        x: 0,
        y: 0,
        toObjectId: toObjectRelation.id,
        formObjectId: object.id,
        points: [
          startPoint.x,
          startPoint.y,
          endPoint.x,
          endPoint.y,
        ],
        pointerLength: 20,
        pointerWidth: 10,
        fill: '#ccc',
        stroke: '#888',
        strokeWidth: 2,
        opacity: 0.5,
      });
      layer.add(arrow);
      arrows.push(arrow);
    });
  }
  return [img, text, arrows, additionalObjects] as KonvaLayerObject[];
}

export function createLayer(editorWrapper: HTMLElement): [Layer, Stage] {
  const canvasSize = {
    width: editorWrapper.clientWidth,
    height: editorWrapper.clientHeight,
  };
  const stage = new Konva.Stage({
    ...canvasSize,
    container: 'canvas',
    fill: '#eee',
    draggable: true,
  });
  const layer = new Konva.Layer();
  const img = new Image();
  img.src = '/editor-background.jpg';
  img.onload = () => {
    const background = new Konva.Rect({
      width: 3000,
      height: 3000,
      x: 0,
      y: 0,
      fillPatternImage: img,
    });
    layer.add(background);
  };
  stage.add(layer);
  layer.draw();
  console.log('layer created');
  return [layer, stage];
}

export const removeAllLayerObjects = (layerObjects: Map<string, any>) => {
  Array.from(layerObjects.values()).flat().forEach((objectToRemove: any) => {
    if (Array.isArray(objectToRemove)) {
      objectToRemove.forEach((innerObject: any) => {
        innerObject.remove();
      });
    } else {
      objectToRemove.remove();
    }
  });
  layerObjects.clear();
};

export const removeObjectOnLayer = (
  layerObjects: Map<string, any>,
  object: MapObject,
) => {
  const objects = layerObjects.get(object.id);
  console.log('objects to remove', objects, layerObjects);
  if (!objects) {
    return;
  }
  objects.forEach((objectToRemove: any) => {
    if (Array.isArray(objectToRemove)) {
      objectToRemove.forEach((innerObject: any) => {
        innerObject.remove();
      });
    } else {
      objectToRemove.remove();
    }
  });
};

export const updateObjectOnLayer = async (
  layerObjects: Map<string, any>,
  layer: Layer,
  object: MapObject,
  vMap: MapStructure,
) => {
  removeObjectOnLayer(layerObjects, object);
  const newObjects = await addObjectToLayer(layer, object, vMap);
  layerObjects.set(object.id, newObjects);
};

export async function cloneObject(
  vObj: MapObject,
  vMap: MapStructure,
  vLayer: Layer,
  layerObjects: Map<string, any>,
) {
  const newId = generateUniqString();
  const clonedObject = cloneDeep(vObj);
  clonedObject.id = newId;
  vMap.objects[newId] = clonedObject;
  const objects = await addObjectToLayer(vLayer, clonedObject, vMap);
  layerObjects.set(clonedObject.id, objects as KonvaLayerObject[]);
}
