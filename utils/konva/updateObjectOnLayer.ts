import {MapObject, MapStructure, MapStructureTypes} from "~/entities";
import Konva from "konva";
import { addObjectToLayer, removeObjectOnLayer } from "~/utils";

const {Layer} = Konva;

export const updateObjectOnLayer = async (
  layerObjects: Map<string, any>,
  layer: InstanceType<typeof Layer>,
  object: MapObject,
  vMap: MapStructure
) => {
  removeObjectOnLayer(layerObjects, object);
  const newObjects = await addObjectToLayer(layer, object, vMap);
  layerObjects.set(object.id, newObjects)
}
