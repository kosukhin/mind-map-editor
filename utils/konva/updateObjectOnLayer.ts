import {MapObject, MapStructureTypes} from "~/entities";
import Konva from "konva";
import {addObjectToLayer} from "~/utils";

const {Layer} = Konva;

export const updateObjectOnLayer = async (
  layerObjects: Map<string, any>,
  layer: InstanceType<typeof Layer>,
  object: MapObject,
  types: MapStructureTypes
) => {
  const objects = layerObjects.get(object.id);
  objects.forEach((object: any) => object.remove());
  const newObjects = await addObjectToLayer(layer, object, types);
  layerObjects.set(object.id, newObjects)
}
